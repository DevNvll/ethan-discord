import { countBy, sortBy, max } from "lodash";

const titles = [
  "Uganda",
  "Dank room",
  "Um titulo",
  "Preciso de mais titulos genericos",
  "👌👌"
];

const REFRESH_RATE = 1000;
const GAMES_CATEGORY_NAME = "Games";
const PREFIX = "🎮";

function getGeneric() {
  return titles[Math.floor(Math.random() * titles.length)];
}

export default {
  onReady(client) {
    setInterval(
      () =>
        client.channels
          .filter(
            channel =>
              channel.parent &&
              channel.parent.name === GAMES_CATEGORY_NAME &&
              channel.type === "voice"
          )
          .map(channel => {
            let gameList = [];
            channel.members.map(member => {
              if (member.presence.game)
                gameList.push(member.presence.game.name);
            });
            if (gameList.length >= 1) {
              let occur = countBy(gameList);
              let mostPlayed = max(Object.keys(occur), o => obj[o]);
              channel.setName(PREFIX + mostPlayed);
            } else if (!titles.includes(channel.name)) {
              channel.setName(getGeneric());
            }
          }),
      REFRESH_RATE
    );
  }
};
