import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="">
      <h1 className="title text-center mt-20 text-3xl">
        UNE ERREUR S'EST PRODUITE
      </h1>
      <p className="text-center mt-5">
        Retourner à l'
        <Link className="text-blue-500 hover:underline" to="/">
          accueil
        </Link>
      </p>
    </div>
  );
}
