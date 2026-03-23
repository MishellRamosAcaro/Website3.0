import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/.pnpm-store/**',
      '*.local',
      '.env',
      '.env.*',
    ],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
)
