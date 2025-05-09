import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User metadata functions
export const getUserMetadata = async (walletAddress) => {
  const { data, error } = await supabase
    .from('user_metadata')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserMetadata = async (walletAddress, metadata) => {
  const { data, error } = await supabase
    .from('user_metadata')
    .upsert({
      wallet_address: walletAddress,
      ...metadata,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;
  return data;
};
