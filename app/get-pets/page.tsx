export default async function Page() {
  const fetchData: any = async () => {
    const response = await fetch(
      'https://next-js-starter-lyart.vercel.app/api/get-pets',
    );
    const data = await response.json();

    return data;
  };

  const data = await fetchData();

  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        <div>
          {data.rows.map((row: any) => {
            return (
              <div>
                <p>Name : {row.name}</p>
                <p>Owner : {row.owner}</p>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
