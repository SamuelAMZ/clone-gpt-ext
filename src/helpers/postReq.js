// post request helpers boiler plate

const postReq = async (data, url) => {
  // headers
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("GET", "POST", "OPTIONS");
  headers.append(
    "Access-Control-Allow-Origin",
    `${process.env.REACT_APP_API_URL}/`
  );
  headers.append("Access-Control-Allow-Credentials", "true");

  try {
    // fetch
    let req = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    const serverRes = await req.json();
    return serverRes;
  } catch (error) {
    console.log(error);
  }

  return false;
};

export default postReq;
