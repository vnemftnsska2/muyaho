class StockRepository {
  async syncLeadingList(key) {
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
    return await result.json();
  }
  
}

export default StockRepository;