async function getCat(id: Number) {
    const response = await fetch(`http://localhost:4000/cats/${id}`, {
			next: {
				revalidate: 60
			}
		})

    return response.json()
}

async function CatDetails({ params }: any) {
    const { id } = params;
    console.log(id)
    const cat = await getCat(id);

  return (
    <div>CatDetails {cat.name}</div>
  )
}

export default CatDetails