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
