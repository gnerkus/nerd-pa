function formatSingle(singleRes, resType, isSingle) {
  if (!singleRes || typeof singleRes !== 'object') {
    throw(new Error('no resource specified'));
  }

  if (!resType || typeof resType !== 'string') {
    throw(new Error('no type specified'));
  }

  const formattedRes = {
    data: {
      type: resType,
      id: singleRes.id,
      attributes: singleRes,
      links: {},
      relationships: {},
    },
  };

  return isSingle ? formattedRes : formattedRes.data;
}

function formatComplex(complexRes, resType) {
  const formattedSingles = complexRes.map((resource) => formatSingle(resource, resType, false));

  return {
    data: formattedSingles,
  };
}

export default function (apiResponse, resType) {
  let result = null;
  if (Array.isArray(apiResponse)) {
    result = formatComplex(apiResponse, resType);
  } else {
    result = formatSingle(apiResponse, resType, true);
  }

  return result;
}
