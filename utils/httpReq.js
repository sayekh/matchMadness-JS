const level = localStorage.getItem("level") || "easy";

const fetchData = async () => {
  const res = await fetch(`data${level}.json`);
  const json = await res.json();
  return json;
};
export { fetchData };
