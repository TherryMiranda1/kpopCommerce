
export const getCard = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/cards/${id}`);

    if (res.status === 200) {
      const card = await res.json();
      setNewCard(card);
    }
  } catch (error) {
    console.log(error);
  }
};
