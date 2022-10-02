const deleteIdAttribute = (sqlModel: SqlModel) => {
  return { ...sqlModel, id: undefined };
};

export default deleteIdAttribute;
