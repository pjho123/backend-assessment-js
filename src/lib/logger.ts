class Logger {
  static log(...data: Array<string | number | {} | undefined>) {
    console.log(...data);
  }
}

export default Logger;
