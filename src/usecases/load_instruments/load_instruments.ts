import loadBonds from './load_bonds'
import loadCurrencies from './load_currency'
import loadEtfs from './load_etfs'
import loadFutures from './load_futures'
import loadShares from './load_shares'

const loadInstruments = async (): Promise<void> => {
  const requests = [
    loadShares(),
    loadBonds(),
    loadEtfs(),
    loadFutures(),
    loadCurrencies()
  ]

  await Promise.all(requests)
    .then((results) => {
      const initial = {
        created: 0,
        updated: 0,
        all: 0
      }

      const info = results.reduce((prev, current) => {
        prev.created += current.created
        prev.updated += current.updated
        prev.all += current.all

        return prev
      }, initial)

      console.log('info', info)
    })
    .catch((errors) => {
      console.log(errors)
    })
}

export default loadInstruments
