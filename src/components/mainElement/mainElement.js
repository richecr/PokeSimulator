import React, { useEffect, useState } from "react";
import api from "../../service/index";
import StatsElement from "../statsElement/statsElement";
import BaseStatsElement from "../baseStatsElement/baseStatsElement";
import DataElement from "../dataElement/dataElement";
import MainButtonElement from "../mainButtonElement/mainButtonElement";
import "./style.css";

function MainElement() {
  const [pokemon, setPokemon] = useState({});
  const [name, setName] = useState("");
  const [level, setLevel] = useState(100);
  const [nature, setNature] = useState("adamant");
  const [hpIv, setHpIv] = useState(0);
  const [attackIv, setAttackIv] = useState(0);
  const [defenseIv, setDefenseIv] = useState(0);
  const [spAttackIv, setSpAttackIv] = useState(0);
  const [spDefenseIv, setSpDefenseIv] = useState(0);
  const [speedIv, setSpeedIv] = useState(0);
  const [hpEv, setHpEv] = useState(0);
  const [attackEv, setAttackEv] = useState(0);
  const [defenseEv, setDefenseEv] = useState(0);
  const [spAttackEv, setSpAttackEv] = useState(0);
  const [spDefenseEv, setSpDefenseEv] = useState(0);
  const [speedEv, setSpeedEv] = useState(0);
  const [types, setTypes] = useState([]);
  const [finalStats, setFinalStats] = useState({});
  const [baseStats, setbaseStats] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [showImg, setShowImg] = useState(false);

  async function handlerSubmit(e) {
    e.preventDefault();
    const response = await api.get(`/${name.toLowerCase()}`);
    setPokemon(response.data);
  }

  useEffect(() => {
    if (pokemon.stats) {
      const pokemonBases = {
        speed: pokemon.stats[5].base_stat,
        spDef: pokemon.stats[4].base_stat,
        spAtk: pokemon.stats[3].base_stat,
        def: pokemon.stats[2].base_stat,
        atk: pokemon.stats[1].base_stat,
        hp: pokemon.stats[0].base_stat,
      };

      setbaseStats(pokemonBases);
      setTypes(pokemon.types);
      setFinalStats(calculaStats(pokemonBases));
      setImgUrl(pokemon.sprites.front_default);
      setShowImg(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon, types]);

  function calculaStats(pokemon) {
    let hp =
      Math.floor(
        ((2 * pokemon.hp + parseInt(hpIv) + Math.floor(parseInt(hpEv) / 4)) *
          parseInt(level)) /
          100
      ) +
      parseInt(level) +
      10;
    let attack =
      Math.floor(
        ((2 * pokemon.atk +
          parseInt(attackIv) +
          Math.floor(parseInt(attackEv) / 4)) *
          parseInt(level)) /
          100
      ) + 5;
    let defense =
      Math.floor(
        ((2 * pokemon.def +
          parseInt(defenseIv) +
          Math.floor(parseInt(defenseEv) / 4)) *
          parseInt(level)) /
          100
      ) + 5;
    let spattack =
      Math.floor(
        ((2 * pokemon.spAtk +
          parseInt(spAttackIv) +
          Math.floor(parseInt(spAttackEv) / 4)) *
          parseInt(level)) /
          100
      ) + 5;
    let spdefense =
      Math.floor(
        ((2 * pokemon.spDef +
          parseInt(spDefenseIv) +
          Math.floor(parseInt(spDefenseEv) / 4)) *
          parseInt(level)) /
          100
      ) + 5;
    let speed =
      Math.floor(
        ((2 * pokemon.speed +
          parseInt(speedIv) +
          Math.floor(parseInt(speedEv) / 4)) *
          parseInt(level)) /
          100
      ) + 5;

    if (
      nature === "bold" ||
      nature === "modest" ||
      nature === "calm" ||
      nature === "timid"
    ) {
      attack *= 0.9;
      attack = Math.floor(attack);
    }

    if (
      nature === "lonely" ||
      nature === "mild" ||
      nature === "gentle" ||
      nature === "hasty"
    ) {
      defense *= 0.9;
      defense = Math.floor(defense);
    }

    if (
      nature === "adamant" ||
      nature === "impish" ||
      nature === "careful" ||
      nature === "jolly"
    ) {
      spattack *= 0.9;
      spattack = Math.floor(spattack);
    }

    if (
      nature === "naughty" ||
      nature === "lax" ||
      nature === "rash" ||
      nature === "naive"
    ) {
      spdefense *= 0.9;
      spdefense = Math.floor(spdefense);
    }

    if (
      nature === "brave" ||
      nature === "relaxed" ||
      nature === "quiet" ||
      nature === "sassy"
    ) {
      speed *= 0.9;
      speed = Math.floor(speed);
    }

    if (
      nature === "lonely" ||
      nature === "adamant" ||
      nature === "brave" ||
      nature === "naughty"
    ) {
      attack *= 1.1;
      attack = Math.floor(attack);
    }

    if (
      nature === "bold" ||
      nature === "impish" ||
      nature === "lax" ||
      nature === "relaxed"
    ) {
      defense *= 1.1;
      defense = Math.floor(defense);
    }

    if (
      nature === "modest" ||
      nature === "mild" ||
      nature === "rash" ||
      nature === "quiet"
    ) {
      spattack *= 1.1;
      spattack = Math.floor(spattack);
    }

    if (
      nature === "calm" ||
      nature === "gentle" ||
      nature === "careful" ||
      nature === "sassy"
    ) {
      spdefense *= 1.1;
      spdefense = Math.floor(spdefense);
    }

    if (
      nature === "timid" ||
      nature === "hasty" ||
      nature === "jolly" ||
      nature === "naive"
    ) {
      speed *= 1.1;
      speed = Math.floor(speed);
    }

    hp = hp.toFixed(0);

    const allStats = { hp, attack, defense, spattack, spdefense, speed };

    return allStats;
  }

  return (
    <div className="mainElement">
      <MainButtonElement
        name={name}
        setName={setName}
        handlerSubmit={handlerSubmit}
      />

      {showImg && (
        <DataElement
          level={level}
          setLevel={setLevel}
          nature={nature}
          setNature={setNature}
          hpIv={hpIv}
          setHpIv={setHpIv}
          attackIv={attackIv}
          setAttackIv={setAttackIv}
          defenseIv={defenseIv}
          setDefenseIv={setDefenseIv}
          spAttackIv={spAttackIv}
          setSpAttackIv={setSpAttackIv}
          spDefenseIv={spDefenseIv}
          setSpDefenseIv={setSpDefenseIv}
          speedIv={speedIv}
          setSpeedIv={setSpeedIv}
          hpEv={hpEv}
          setHpEv={setHpEv}
          attackEv={attackEv}
          setAttackEv={setAttackEv}
          defenseEv={defenseEv}
          setDefenseEv={setDefenseEv}
          spAttackEv={spAttackEv}
          setSpAttackEv={setSpAttackEv}
          spDefenseEv={spDefenseEv}
          setSpDefenseEv={setSpDefenseEv}
          speedEv={speedEv}
          setSpeedEv={setSpeedEv}
          handlerSubmit={handlerSubmit}
        />
      )}

      {showImg && (
        <StatsElement
          finalStats={finalStats}
          name={name}
          types={types}
          imgUrl={imgUrl}
        />
      )}

      {showImg && <BaseStatsElement baseStats={baseStats} />}
    </div>
  );
}

export default MainElement;
