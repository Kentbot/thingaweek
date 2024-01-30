import Papa from 'papaparse'

export async function parseCsv(file: File): Promise<unknown[]> {
  return new Promise((res, rej) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        res(results.data)
      },
      error: function() {
        rej()
      }
    })
  })
}