class StockRepository {
  async asyncLeadingList(key) {
    const apiUrl = key === undefined ? '/api/leading' : `/api/leading/${key}`
    const result = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .catch(err => {
        console.log(err);
        return [];
    });
    return result.json();
  }
  
}

export default StockRepository;