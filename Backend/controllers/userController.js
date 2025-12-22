export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const storeRecentSearchCities = async (req, res) => {
  try {
    const { recentSearchedCitie } = req.body;
    const user = await req.user;
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCitie);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCitie);
    }
    await user.save();
    res.json({ success: true, message: "New city added." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
