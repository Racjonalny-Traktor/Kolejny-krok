export type ScrapeFn<Item, Result> = (item: Item) => Promise<Result>;

export async function processApiCall<Item, Result>(item: Item, scrape: ScrapeFn<Item, Result>): Promise<Result> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const scrapedData = scrape(item);
      return resolve(scrapedData);
    }, 350);
  });
}
