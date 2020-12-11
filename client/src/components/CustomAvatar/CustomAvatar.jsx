import React from "react";
import Avatar from "avataaars";

const CustomAvatar = React.memo((props) => {
  const top = [
    "NoHair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    " WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    " LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesarSidePart",
  ];

  const accessories = [
    "Blank",
    "Kurt",
    "Prescription01",
    "rescription02",
    "Round",
    "Sunglasses",
    "Wayfarers",
  ];

  const HatColor = [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White",
  ];

  const FacialHair = [
    "Blank",
    "BeardMedium",
    "BeardLight",
    "BeardMagestic",
    "MoustacheFancy",
    "MoustacheMagnum",
  ];

  const facialHairColor = [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "Platinum",
    "Red",
  ];

  const clothes = [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ];

  const colorFabric = [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White",
  ];

  const eyes = [
    "Close",
    "Default",
    "Dizzy",
    "EyeRoll",
    "Happy",
    "Hearts",
    "Side",
    "Squint",
    "Surprised",
    "Wink",
    "WinkWacky",
  ];

  const eyeBrow = [
    "Angry",
    "AngryNatural",
    "Default",
    "DefaultNatural",
    "FlatNatural",
    "RaisedExcited",
    "RaisedExcitedNatural",
    "SadConcerned",
    "SadConcernedNatural",
    "UnibrowNatural",
    "UpDown",
    "UpDownNatural",
  ];

  const mouth = [
    "Concerned",
    "Default",
    "Disbelief",
    "Eating",
    "Grimace",
    "Sad",
    "ScreamOpen",
    "Serious",
    "Smile",
    "Tongue",
    "Twinkle",
    "Vomit",
  ];

  const skin = [
    "Tanned",
    "Yellow",
    "Pale",
    "Light",
    "Brown",
    "DarkBrown",
    "Black",
  ];
  return (
    <Avatar
      style={{
        width: props.width ? props.width : "100px",
        height: props.height ? props.height : "100px",
        objectFit: "contain",
      }}
      avatarStyle="Circle"
      topType={top[Math.floor(Math.random() * top.length)]}
      accessoriesType={
        accessories[Math.floor(Math.random() * accessories.length)]
      }
      hairColor={
        facialHairColor[Math.floor(Math.random() * facialHairColor.length)]
      }
      facialHairType={FacialHair[Math.floor(Math.random() * FacialHair.length)]}
      clotheType={clothes[Math.floor(Math.random() * clothes.length)]}
      clotheColor={colorFabric[Math.floor(Math.random() * colorFabric.length)]}
      eyeType={eyes[Math.floor(Math.random() * eyes.length)]}
      eyebrowType={eyeBrow[Math.floor(Math.random() * eyeBrow.length)]}
      mouthType={mouth[Math.floor(Math.random() * mouth.length)]}
      skinColor={skin[Math.floor(Math.random() * skin.length)]}
    />
  );
});

export default CustomAvatar;
