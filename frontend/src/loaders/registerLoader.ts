import { getCities } from "../queries";

export async function registerLoader() {
  try {
    const cities = await getCities();

    return { cities };
  } catch (err) {
    console.log(err);
  }
}
