interface DatabaseResponse {
  success: boolean;
  message?: Error;
  lastIndex?:number;
  rowsChanged?:number;
}

export default DatabaseResponse;
