![image](https://user-images.githubusercontent.com/73115539/206912277-8e286bb3-ce35-465a-9f59-e27752cf0398.png)

# Finger Monster

👌 A web-based game written in Typescript to teach ASL alphabet.

Player will be given an alphabet at the top left corner. They have to make correct handsign to attack enemies. At the bottom left corner, your camera is displayed 
and besides it is the current alphabet handsign read from your camera. Player can hold spacebar key to change the given character, costing 30 mana. Player has 100 mana maximum, regenerating 0.01 mana/frame(30 mana/50 seconds).

Each enemy has different health, speed, damage. Enemies are randomly spawned in waves. The frequency and chance of spawning increase as the game progresses. There are 10 waves. 
There are 25-second wave cooldown in between waves. 

Total playtime: 15 minutes + wave cooldown = 18 minutes 45 seconds (not limited but it will be impossible to go any further). 

### Developed by
- [riflowth](https://github.com/riflowth)
- [XiaoXuxxxx](https://github.com/XiaoXuxxxx)
- [jate-koh](https://github.com/jate-koh)
- [eltfshr](https://github.com/eltfshr)
- [Porping](https://github.com/Porping)

### To Help Develop

Clone this repository and run

    yarn
    yarn dev
  
The game will start on http://localhost:5173

### To Build and Play the Game

Clone this repository and run

    yarn
    yarn build
    yarn electron
    
### All Classes used   
![image](https://i.imgur.com/ZWLOfVw.jpg)
    
## Credits to:
- [howler](https://github.com/goldfire/howler.js/) (Audio library)
- [fingerpose](https://github.com/andypotato/fingerpose) (Hand detection)
