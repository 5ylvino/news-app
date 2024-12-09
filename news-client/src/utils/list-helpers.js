const isAvailable = item =>
  !item?.title?.includes('[Removed]') && item?.title && item?.content;
/**
 * Fetch items that are up-to-date
 * @param Array list
 */
export function filterList(list = []) {
  return list?.filter(item => isAvailable(item) && item);
}

/**
 * Fetch items with images only
 * @param Array list
 */
export function filterListWithImage(list = []) {
  return list?.filter(
    item => isAvailable(item) && item?.image_url
  );
}

/**
 * Fetch list of authors
 * @param Array list
 */
export function filterListOfAuthor(list = []) {
  return list
    ?.filter(item => !!item?.source && !!item?.author)
    ?.map(item => ({
      author: item?.author?.toLowerCase(),
      source: item?.source
    }));
}

/**
 * Fetch list of sources
 * @param Array list
 * @param Array<string> list
 */
export function filterListOfSource(list = []) {
  return list
    ?.filter(item => !!item?.source && item)
    ?.map(item => item?.source)
    .reduce((acc, item) => {
      if (acc?.includes(item)) {
        return [...acc];
      }
      return [...acc, item];
    }, [])
    ?.slice(0, 13);
}
