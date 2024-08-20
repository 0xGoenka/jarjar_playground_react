import "./discordWall.css";

type Props = {
  setCode: React.Dispatch<React.SetStateAction<string>>;
  code: string;
};

export const DiscordWall = ({ setCode, code }: Props) => {
  return (
    <div className="body">
      <div className="container-wall">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          id="codeInput"
          className="neumorphic"
          placeholder="Enter code"
        />
        <br />
        <button id="validateBtn" className="neumorphic">
          Validate
        </button>
        <p className="discord-link">
          Find the code in the{" "}
          <a href="https://discord.com/invite/bsXbpdVJjc" target="_blank">
            Discord
          </a>
        </p>
      </div>
    </div>
  );
};
