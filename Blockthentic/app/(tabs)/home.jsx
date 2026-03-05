import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert, TextInput, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabaseClient';

const short = (value) => (value ? `${value.slice(0, 8)}...${value.slice(-6)}` : 'Pending');

function getExplorerAddressUrl(chain, contractAddress) {
  if (!contractAddress) return null;
  if (chain === 'ethereum') return `https://sepolia.etherscan.io/address/${contractAddress}`;
  if (chain === 'polygon') return `https://amoy.polygonscan.com/address/${contractAddress}`;
  if (chain === 'arbitrum') return `https://sepolia.arbiscan.io/address/${contractAddress}`;
  return null;
}

const ContractCard = ({ item }) => {
  const explorerUrl = getExplorerAddressUrl(item.chain, item.contractAddress);

  const openExplorer = async () => {
    if (!explorerUrl) return;
    try {
      await Linking.openURL(explorerUrl);
    } catch {
      Alert.alert('Open failed', 'Could not open explorer link.');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMeta}>Role: {item.roleLabel}</Text>
        <Text style={styles.cardMeta}>Access: {item.accessMode || 'owner_only'}</Text>
        <Text style={styles.cardMeta}>Created: {item.date}</Text>
        <Text style={styles.cardMeta}>Type: {item.type}</Text>
        <Text style={styles.cardMeta}>Chain: {item.chain || 'n/a'}</Text>
        <Text style={styles.cardMeta}>Status: {item.status || 'unknown'}</Text>
        <Text style={styles.cardAddress}>Contract: {short(item.contractAddress)}</Text>
        <Text style={styles.cardAddress}>Config: {short(item.configHash)}</Text>

        {explorerUrl && (
          <TouchableOpacity onPress={openExplorer} style={styles.explorerButton}>
            <Text style={styles.explorerButtonText}>Open in Explorer</Text>
          </TouchableOpacity>
        )}
      </View>

      <Ionicons name="cube-outline" size={28} color="#003262" />
    </View>
  );
};

function groupAssetsByRegistry(assets, registryMap) {
  const grouped = new Map();
  for (const asset of assets) {
    const key = asset.registry_id || 'unknown';
    const registry = registryMap.get(key);
    if (!grouped.has(key)) {
      grouped.set(key, {
        registryId: key,
        registryName: registry?.name || 'Unknown Registry',
        chain: registry?.chain || 'n/a',
        contractAddress: registry?.contract_address || null,
        items: [],
      });
    }
    grouped.get(key).items.push(asset);
  }
  return Array.from(grouped.values());
}

function filterGroups(groups, search) {
  if (!search) return groups;
  const lowerSearch = search.toLowerCase();
  return groups.map(group => {
    const registryMatch = group.registryName?.toLowerCase().includes(lowerSearch);
    const filteredItems = group.items.filter(item =>
      (item.file_name || '').toLowerCase().includes(lowerSearch)
    );
    if (registryMatch) return group; 
    if (filteredItems.length > 0) return { ...group, items: filteredItems }; 
    return null;
  }).filter(Boolean);
}

const SearchBox = ({ value, onChange }) => (
  <View style={styles.searchContainer}>
    <Ionicons name="search-outline" size={18} color="rgba(0, 50, 98, 0.6)" />
    <TextInput
      style={styles.searchInput}
      placeholder="Filter results"
      placeholderTextColor="rgba(0, 50, 98, 0.4)"
      value={value}
      onChangeText={onChange}
    />
  </View>
);

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [assignedToMe, setAssignedToMe] = useState([]);
  const [registeredByMe, setRegisteredByMe] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchRegistries, setSearchRegistries] = useState('');
  const [searchAssigned, setSearchAssigned] = useState('');
  const [searchRegistered, setSearchRegistered] = useState('');
  const [expandedRegistries, setExpandedRegistries] = useState(false);
  const [expandedAssigned, setExpandedAssigned] = useState(false);
  const [expandedRegistered, setExpandedRegistered] = useState(false);

  // --- INFO MODAL STATE ---
  const [infoModal, setInfoModal] = useState({ visible: false, title: '', text: '' });

  const openInfo = (title, text) => {
    setInfoModal({ visible: true, title, text });
  };

  const loadData = React.useCallback(async () => {
    if (!user || !supabase) return;
    setLoading(true);
    try {
      const [
        { data: profileData, error: profileError },
        { data: registryData, error: registryError },
        { data: memberships, error: membershipsError },
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('username, email, created_at')
          .eq('id', user.id)
          .maybeSingle(),
        supabase
          .from('registries')
          .select('id, owner_id, name, template_type, chain, contract_address, config_hash, deployment_status, created_at, access_mode')
          .order('created_at', { ascending: false }),
        supabase
          .from('registry_memberships')
          .select('registry_id, role, status')
          .eq('user_id', user.id)
          .eq('status', 'active'),
      ]);
      if (profileError) {
        console.error('Profile load error:', profileError.message || profileError);
      }
      if (registryError) {
        console.error('Registry load error:', registryError.message || registryError);
      }
      if (membershipsError) {
        console.error('Membership load error:', membershipsError.message || membershipsError);
      }
      const membershipMap = new Map((memberships || []).map((m) => [m.registry_id, m.role]));

      // Load assigned assets with a fallback if `status` column/query fails.
      let assignedRows = [];
      {
        const { data, error } = await supabase
          .from('registry_records')
          .select('id, file_name, resource_uri, tx_hash, created_at, registry_id, owner_id, assigned_user_id, assigned_username, registered_by_user_id, registered_by_username, status')
          .eq('assigned_user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(30);

        if (error) {
          const { data: fallback, error: fallbackErr } = await supabase
            .from('registry_records')
            .select('id, file_name, resource_uri, tx_hash, created_at, registry_id, owner_id, assigned_user_id, assigned_username, registered_by_user_id, registered_by_username')
            .eq('assigned_user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(30);
          if (fallbackErr) {
            console.error('Assigned assets load error:', fallbackErr.message || fallbackErr);
          }
          assignedRows = fallback || [];
        } else {
          assignedRows = data || [];
        }
      }

      // Load registered assets with a fallback if `status` column/query fails.
      let registeredRows = [];
      {
        const { data, error } = await supabase
          .from('registry_records')
          .select('id, file_name, resource_uri, tx_hash, created_at, registry_id, assigned_user_id, assigned_username, registered_by_user_id, registered_by_username, owner_id, status')
          .or(`registered_by_user_id.eq.${user.id},owner_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(30);

        if (error) {
          const { data: fallback, error: fallbackErr } = await supabase
            .from('registry_records')
            .select('id, file_name, resource_uri, tx_hash, created_at, registry_id, assigned_user_id, assigned_username, registered_by_user_id, registered_by_username, owner_id')
            .or(`registered_by_user_id.eq.${user.id},owner_id.eq.${user.id}`)
            .order('created_at', { ascending: false })
            .limit(30);
          if (fallbackErr) {
            console.error('Registered assets load error:', fallbackErr.message || fallbackErr);
          }
          registeredRows = fallback || [];
        } else {
          registeredRows = data || [];
        }
      }


      // Load revoked history rows for registrant view.
      let revokedHistoryRows = [];
      {
        const { data, error } = await supabase
          .from('registry_revoked_records')
          .select('id, file_name, created_at, registry_id, owner_id, assigned_user_id, assigned_username, registered_by_user_id, registered_by_username, revoked_tx_hash, revoke_reason, revoke_reason_label, revoked_at, doc_hash')
          .or(`registered_by_user_id.eq.${user.id},owner_id.eq.${user.id}`)
          .order('revoked_at', { ascending: false })
          .limit(30);

        if (error) {
          console.error('Revoked history load error:', error.message || error);
          revokedHistoryRows = [];
        } else {
          revokedHistoryRows = (data || []).map((r) => ({
            id: `revoked-${r.id}`,
            file_name: r.file_name,
            resource_uri: null,
            tx_hash: r.revoked_tx_hash,
            created_at: r.revoked_at || r.created_at,
            registry_id: r.registry_id,
            owner_id: r.owner_id,
            assigned_user_id: r.assigned_user_id,
            assigned_username: r.assigned_username,
            registered_by_user_id: r.registered_by_user_id,
            registered_by_username: r.registered_by_username,
            status: 'revoked',
            revocation_reason: r.revoke_reason,
            revocation_reason_label: r.revoke_reason_label,
            doc_hash: r.doc_hash,
          }));
        }
      }
      const relatedRegistryIds = new Set(
        [...(assignedRows || []), ...(registeredRows || []), ...(revokedHistoryRows || [])]
          .map((row) => row?.registry_id)
          .filter(Boolean)
      );

      const visibleRegistries = (registryData || []).reduce((acc, registry) => {
        const role = membershipMap.get(registry.id) || null;
        const allowedByRole = registry.owner_id === user.id || Boolean(role) || registry.access_mode === 'public_read';
        const allowedByAssetLink = relatedRegistryIds.has(registry.id);
        if (allowedByRole || allowedByAssetLink) acc.push({ ...registry, role });
        return acc;
      }, []);

      setProfile(profileData || null);
      setContracts(visibleRegistries);
      setAssignedToMe(Array.isArray(assignedRows) ? assignedRows.filter((r) => r?.status !== 'revoked') : []);
      const mergedRegistered = [...(registeredRows || []), ...(revokedHistoryRows || [])];
      setRegisteredByMe(Array.isArray(mergedRegistered) ? mergedRegistered : []);
    } catch (err) {
      console.error('Home data load error:', err?.message ?? err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [loadData])
  );

  const userName = profile?.username || user?.email?.split('@')[0] || 'Member';

  const openAsset = async (asset) => {
    try {
      const uri = asset?.resource_uri || '';
      if (!uri) {
        Alert.alert('No asset URI', 'This record does not have a stored asset URL.');
        return;
      }

      let finalUrl = uri;
      const isHttp = /^https?:\/\//i.test(uri);
      const isSupabase = uri.startsWith('supabase://');
      const isIpfs = uri.startsWith('ipfs://');

      if (!isHttp && !isSupabase && !isIpfs) {
        const filename = uri;
        const registryId = asset?.registry_id;
        if (!filename || !registryId) {
          Alert.alert('Legacy record', 'This asset has no usable URI or registry metadata.');
          return;
        }

        const candidatePrefixes = [
          `${user?.id || ''}/${registryId}`,
          `${asset?.owner_id || ''}/${registryId}`,
        ].filter(Boolean);

        let matchedPath = null;
        for (const prefix of candidatePrefixes) {
          const { data: objects, error: listErr } = await supabase.storage.from('registry-assets').list(prefix, { limit: 100 });
          if (listErr) continue;

          const exact = (objects || []).find((f) => f?.name === filename);
          if (exact) {
            matchedPath = `${prefix}/${exact.name}`;
            break;
          }

          const suffixed = (objects || []).find((f) => f?.name?.endsWith(`-${filename}`));
          if (suffixed) {
            matchedPath = `${prefix}/${suffixed.name}`;
            break;
          }
        }

        if (!matchedPath) {
          Alert.alert('Legacy record', 'Could not find this file in storage. Re-upload this asset once to bind it to a stable URL.');
          return;
        }

        const { data: signed, error: signedErr } = await supabase.storage
          .from('registry-assets')
          .createSignedUrl(matchedPath, 60 * 30);
        if (signedErr) throw signedErr;

        finalUrl = signed?.signedUrl;
      }

      if (isSupabase) {
        const raw = uri.replace('supabase://', '');
        const slash = raw.indexOf('/');
        if (slash <= 0) {
          Alert.alert('Invalid URI', 'Stored asset URI format is invalid.');
          return;
        }
        const bucket = raw.slice(0, slash);
        const path = raw.slice(slash + 1);
        const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 30);
        if (error) throw error;
        finalUrl = data?.signedUrl;
      }

      if (!finalUrl) {
        Alert.alert('Open failed', 'Could not create a valid asset URL.');
        return;
      }

      await Linking.openURL(finalUrl);
    } catch (err) {
      Alert.alert('Open asset failed', err?.message || 'Unknown error while opening asset.');
      console.error('Open asset failed:', err?.message || err);
    }
  };

  const contractCards = useMemo(() => (
    contracts.map((contract) => {
      const isOwner = contract.owner_id === user?.id;
      return {
        id: contract.id,
        title: contract.name,
        date: contract.created_at ? new Date(contract.created_at).toLocaleDateString() : 'Unknown',
        type: contract.template_type,
        chain: contract.chain,
        status: contract.deployment_status,
        accessMode: contract.access_mode,
        roleLabel: isOwner ? 'owner' : (contract.role || 'user'),
        contractAddress: contract.contract_address,
        configHash: contract.config_hash,
      };
    })
  ), [contracts, user?.id]);

  const registryMap = useMemo(() => {
    const m = new Map();
    contracts.forEach((c) => m.set(c.id, c));
    return m;
  }, [contracts]);

  const assignedGroupedRaw = useMemo(() => groupAssetsByRegistry(assignedToMe, registryMap), [assignedToMe, registryMap]);
  const registeredGroupedRaw = useMemo(() => groupAssetsByRegistry(registeredByMe, registryMap), [registeredByMe, registryMap]);

  const filteredRegistries = useMemo(() => {
    if (!searchRegistries) return contractCards;
    return contractCards.filter(c => c.title?.toLowerCase().includes(searchRegistries.toLowerCase()));
  }, [contractCards, searchRegistries]);

  const filteredAssigned = useMemo(() => filterGroups(assignedGroupedRaw, searchAssigned), [assignedGroupedRaw, searchAssigned]);
  const filteredRegistered = useMemo(() => filterGroups(registeredGroupedRaw, searchRegistered), [registeredGroupedRaw, searchRegistered]);

  const displayedRegistries = expandedRegistries ? filteredRegistries : filteredRegistries.slice(0, 3);
  const displayedAssigned = expandedAssigned ? filteredAssigned : filteredAssigned.slice(0, 3);
  const displayedRegistered = expandedRegistered ? filteredRegistered : filteredRegistered.slice(0, 3);

  const renderGroupedAssets = (groups, emptyMessage) => {
    if (groups.length === 0) {
      return <Text style={styles.emptyText}>{searchAssigned || searchRegistered ? "No matching assets found." : emptyMessage}</Text>;
    }

    return groups.map((group) => (
      <View key={group.registryId} style={styles.groupCard}>
        <Text style={styles.groupTitle}>{group.registryName}</Text>
        <Text style={styles.cardMeta}>Chain: {group.chain}</Text>
        <Text style={styles.cardMeta}>Contract: {short(group.contractAddress)}</Text>

        {group.items.map((asset) => (
          <View key={asset.id} style={styles.assetCard}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.cardTitle}>{asset.file_name || 'Unnamed file'}</Text>
              <Text style={styles.cardMeta}>Assigned To: {asset.assigned_username || 'n/a'}</Text>
              <Text style={styles.cardMeta}>Registered By: {asset.registered_by_username || 'n/a'}</Text>
              <Text style={styles.cardMeta}>Uploaded: {asset.created_at ? new Date(asset.created_at).toLocaleString() : 'Unknown'}</Text>
              <Text style={styles.cardMeta}>Tx: {short(asset.tx_hash)}</Text>
              <Text style={[styles.cardMeta, asset.status === 'revoked' ? styles.revokedText : null]}>Status: {asset.status || 'active'}</Text>
              {asset.status === 'revoked' ? <Text style={[styles.cardMeta, styles.revokedText]}>Reason: {asset.revocation_reason_label || 'Revoked'}</Text> : null}
            </View>
            {asset.resource_uri && asset.status !== 'revoked' ? (
              <TouchableOpacity onPress={() => openAsset(asset)} style={styles.explorerButton}>
                <Text style={styles.explorerButtonText}>Open Asset</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#bdc8feff', '#fef4d3ff']} style={styles.background} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.greetingText}>Hi, {userName}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* --- SECTION: Accessible Registries --- */}
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Accessible Registries</Text>
                <TouchableOpacity 
                  onPress={() => openInfo('Accessible Registries', 'These are the blockchain smart contracts (vaults) you have permission to view or manage. Registries hold verified asset records.')}
                >
                  <Ionicons name="information-circle-outline" size={22} color="#003262" />
                </TouchableOpacity>
              </View>
              <SearchBox value={searchRegistries} onChange={setSearchRegistries} />
            </View>

            {displayedRegistries.length > 0 ? (
              displayedRegistries.map((contract) => (
                <ContractCard key={contract.id} item={contract} />
              ))
            ) : (
              <Text style={styles.emptyText}>
                {loading ? 'Loading registries...' : (searchRegistries ? 'No matching registries found.' : 'No registries available yet.')}
              </Text>
            )}

            {filteredRegistries.length > 3 && (
              <TouchableOpacity style={styles.showAllButton} onPress={() => setExpandedRegistries(!expandedRegistries)}>
                <Text style={styles.showAllText}>{expandedRegistries ? 'Show less' : `Show all (${filteredRegistries.length})`}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.addContractRow} onPress={() => router.push('/create')}>
              <Text style={styles.addContractText}>+ Create Registry</Text>
            </TouchableOpacity>


            {/* --- SECTION: Assets Assigned To Me --- */}
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Assets Assigned To Me</Text>
                <TouchableOpacity 
                  onPress={() => openInfo('Assets Assigned To Me', 'Documents or files that someone else has registered on the blockchain and explicitly linked to your account for your review or ownership.')}
                >
                  <Ionicons name="information-circle-outline" size={22} color="#003262" />
                </TouchableOpacity>
              </View>
              <SearchBox value={searchAssigned} onChange={setSearchAssigned} />
            </View>
            
            {renderGroupedAssets(displayedAssigned, 'No assets assigned to you yet.')}
            
            {filteredAssigned.length > 3 && (
              <TouchableOpacity style={styles.showAllButton} onPress={() => setExpandedAssigned(!expandedAssigned)}>
                <Text style={styles.showAllText}>{expandedAssigned ? 'Show less groups' : `Show all groups (${filteredAssigned.length})`}</Text>
              </TouchableOpacity>
            )}


            {/* --- SECTION: Assets Registered By Me --- */}
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Assets Registered By Me</Text>
                <TouchableOpacity 
                  onPress={() => openInfo('Assets Registered By Me', 'Files you have permanently anchored to the blockchain. You have mathematical proof of the exact time and state of these files when they were registered.')}
                >
                  <Ionicons name="information-circle-outline" size={22} color="#003262" />
                </TouchableOpacity>
              </View>
              <SearchBox value={searchRegistered} onChange={setSearchRegistered} />
            </View>

            {renderGroupedAssets(displayedRegistered, 'You have not registered any assets yet.')}

            {filteredRegistered.length > 3 && (
              <TouchableOpacity style={styles.showAllButton} onPress={() => setExpandedRegistered(!expandedRegistered)}>
                <Text style={styles.showAllText}>{expandedRegistered ? 'Show less groups' : `Show all groups (${filteredRegistered.length})`}</Text>
              </TouchableOpacity>
            )}

          </ScrollView>
        </View>
      </SafeAreaView>

      {/* --- INFO BUBBLE MODAL --- */}
      <Modal visible={infoModal.visible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setInfoModal({ ...infoModal, visible: false })}
        >
          <View style={styles.infoModalContent}>
            <Text style={styles.infoModalTitle}>{infoModal.title}</Text>
            <Text style={styles.infoModalText}>{infoModal.text}</Text>
            <TouchableOpacity 
              style={styles.infoModalButton} 
              onPress={() => setInfoModal({ ...infoModal, visible: false })}
            >
              <Text style={styles.infoModalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  safeArea: { flex: 1, paddingTop: 60 },
  contentWrapper: { flex: 1, paddingHorizontal: 25, paddingTop: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  greetingText: { fontSize: 36, color: '#003262', fontWeight: '400' },
  
  // Section Headers & Search
  sectionHeaderContainer: {
    marginBottom: 15,
    marginTop: 15,
    gap: 12, 
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#003262' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    borderWidth: 1,
    borderColor: 'rgba(0, 50, 98, 0.4)',
    borderRadius: 25, 
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#003262',
    fontSize: 14,
    fontWeight: '500',
    ...(Platform.OS === 'web' && { outlineStyle: 'none' }), 
  },
  
  // Expansion Buttons
  showAllButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  showAllText: {
    color: '#003262',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  scrollContent: { paddingBottom: 120, maxWidth: 800, width: '100%', alignSelf: 'center' },
  emptyText: { color: '#003262', fontSize: 14, textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: '#7d8ec4',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#003262',
  },
  cardContent: { flex: 1, paddingRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#003262', marginBottom: 4 },
  cardMeta: { fontSize: 12, color: '#1f2a44', marginBottom: 2 },
  cardAddress: { fontSize: 12, color: '#003262', marginTop: 2, fontWeight: '600' },
  explorerButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#003262',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.25)'
  },
  explorerButtonText: { color: '#003262', fontSize: 12, fontWeight: '700' },
  addContractRow: { alignItems: 'flex-end', marginTop: 6, marginBottom: 10 },
  addContractText: { color: '#003262', fontSize: 16, fontWeight: '500' },
  groupCard: {
    borderWidth: 1,
    borderColor: '#003262',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(125, 142, 196, 0.2)',
  },
  groupTitle: { fontSize: 15, fontWeight: '800', color: '#003262', marginBottom: 4 },
  assetCard: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#003262',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Info Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 50, 98, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#003262',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  infoModalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#003262',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoModalText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoModalButton: {
    backgroundColor: '#003262',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  infoModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  }
});














