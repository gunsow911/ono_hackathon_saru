import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

const config = [
  ...nextVitals,
  prettier,
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
  { ignores: ['.next/**'] },
]

export default config
