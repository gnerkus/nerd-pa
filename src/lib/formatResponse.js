function formatSingle(singleRes, resType, isSingle) {
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
