import instrumentsTableManager from "../../managers/instruments_table_manager";

const getAllInstruments = () => {
  return instrumentsTableManager.getAll();
};

export default getAllInstruments;
