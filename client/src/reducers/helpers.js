import { normalizeData } from '../middleware/helpers';

export const reorderResults = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function handleDrop(prevOrder, result) {
  const nextOrder = reorderResults(
    prevOrder,
    result.source.index,
    result.destination.index
  );
  const nextState = normalizeData(nextOrder)

  return {...nextState}
}