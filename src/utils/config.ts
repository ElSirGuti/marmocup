import { supabase } from './supabase/client';

export async function getSiteConfig() {
    const { data, error } = await supabase.from('site_config').select('*');
    if (error) {
        console.error('Error fetching site config:', error);
        return {};
    }

    // Convert array of {key, value} to object {key: value}
    const config = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {} as Record<string, string>);

    return config;
}

export async function updateSiteConfig(key: string, value: string) {
    const { error } = await supabase
        .from('site_config')
        .upsert({ key, value });

    return error;
}
