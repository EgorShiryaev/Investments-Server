import loadBonds from "./load_bonds";
import loadCurrencies from "./load_currency";
import loadEtfs from "./load_etfs";
import loadFutures from "./load_futures";
import loadShares from "./load_shares";

const loadInstruments = async () => {
  //@ts-ignore
  const results: {
    created: number;
    updated: number;
  }[] = await Promise.all([
    loadShares(),
    loadBonds(),
    loadEtfs(),
    loadFutures(),
    loadCurrencies(),
  ]);

  const info = results.reduce(
    (prev, current) => {
      return {
        created: prev.created + current.created,
        updated: prev.updated + current.updated,
      };
    },
    {
      created: 0,
      updated: 0,
    }
  );

  console.log("rows created", info.created);
  console.log("rows updated", info.updated);
};

export default loadInstruments;
