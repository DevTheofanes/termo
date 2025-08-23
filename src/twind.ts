import { setup, tw } from 'twind'
import config from '../twind.config'
import { virtualSheet } from 'twind/sheets'

const sheet = virtualSheet()
setup({ ...config, sheet })

export { tw }
