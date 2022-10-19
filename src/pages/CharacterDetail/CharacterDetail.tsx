import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, User } from "../../hooks/Auth";
import { getCharacter, updateFavs } from "../../services/character";
import { Character } from "../Home/Home";
import styles from "./styles.module.css";
import StarRegular from "./../../assets/star-solid.svg";
import NotFound from "../NotFound/NotFound";

export const CharacterDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const { user: userAuth } = useAuth();
  const [user, setUser] = useState<User | null>(userAuth);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        const { data: character, status } = await getCharacter(id);
        if (status === 200) {
          setCharacter(character);
        } else {
          setNotFound(true);
        }
      };
      fetchCharacter();
    }
  }, [id, user]);

  const isFavorite = (characterId: number): boolean | null => {
    return user && user.favs.includes(characterId);
  };

  const makeFav = async (id: number) => {
    if (!user?.favs) return;
    let favs = user.favs;
    if (user.favs.includes(id)) {
      favs.splice(favs.indexOf(id), 1);
    } else {
      favs.push(id);
    }
    await updateFavs(user.id, favs);
    setUser({ ...user, favs });
  };

  return (
    <div>
      <div className={styles.container}>
        {character && (
          <div className={styles.cardMain}>
            <div className={styles.card}>
              <img src={character.image} alt={character.name} />
              <div className={styles.cardContainer}>
                <div className={styles.cardHeader}>
                  <h2>{character.name}</h2>
                  {isFavorite(character.id) && (
                    <img src={StarRegular} alt="website logo" />
                  )}
                </div>
                <p>
                  <b>Status: </b>
                  <span
                    className={
                      character.status === "Alive"
                        ? styles.statusActive
                        : styles.statusInactive
                    }
                  />
                  {character.status}
                </p>
                <p>
                  <b>Species: </b>
                  {character.species}
                </p>
                {character.type && (
                  <p>
                    <b>Type: </b>
                    {character.type}
                  </p>
                )}
                <p>
                  <b>Gender: </b>
                  {character.gender}
                </p>
                <p>
                  <b>Origin: </b> {character.origin.name}
                </p>
                <p>
                  <b>Last Known Location: </b> {character.location.name}
                </p>
                <p>
                  <b>Appeared in: </b> {character.episode.length} episodes
                </p>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => makeFav(character.id)}
                    className={styles.favButton}
                  >
                    {!isFavorite(character.id) ? "Like it!" : "Unlike"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {notFound && <NotFound />}
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
};
