import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import {
  getSessionStorageObject,
  setSessionStorageObject,
} from "../../helpers/storage";
import { useAuth } from "../../hooks/Auth";
import { getAllCharacters } from "../../services/character";
import styles from "./styles.module.css";
import StarRegular from "./../../assets/star-solid.svg";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
};

export const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(parseInt(getSessionStorageObject("page")));
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const characters = await getAllCharacters(page);
      setCharacters(characters.results);
      setLoading(false);
      setTotalPages(characters.info.pages);
    };
    fetchCharacters();
  }, [page]);

  const handleClick = async (num: number) => {
    setSessionStorageObject("page", num);
    setPage(parseInt(getSessionStorageObject("page")));
  };

  const isFavorite = (characterId: number): boolean | null => {
    return user && user.favs.includes(characterId);
  };

  return (
    <div className={styles.container}>
      <h1 style={{ fontWeight: "normal" }}>Wubba lubba dub dub</h1>
      <div className={styles.cardsContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          characters.map((character) => {
            return (
              <div className={styles.card}>
                <img src={character.image} alt={character.name} />
                <div className={styles.cardContainer}>
                  <div className={styles.cardHeader}>
                    <h4>
                      <b>
                        <Link
                          style={{ color: "black" }}
                          to={`/character/${character.id}`}
                        >
                          {character.name}
                        </Link>
                      </b>
                    </h4>
                    {isFavorite(character.id) && (
                      <img src={StarRegular} alt="star" />
                    )}
                  </div>
                  <p>
                    <span
                      className={
                        character.status === "Alive"
                          ? styles.statusActive
                          : styles.statusInactive
                      }
                    />
                    {character.status} - {character.species}{" "}
                  </p>
                  <p style={{ fontWeight: 400 }}>Last Known Location: </p>
                  <p>{character.origin.name}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        handleClick={handleClick}
      />
    </div>
  );
};
