import type { InitialOptionsTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'

const config: InitialOptionsTsJest = {
  verbose: true,
  transform: {
    ...tsjPreset.transform,
  },
}

export default config