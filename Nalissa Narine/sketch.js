// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyCx3NEl9NI5C1pzcT5z1_6xSgiEsgs9yik",
   authDomain: "lunaaa-copy.firebaseapp.com",
   databaseURL: "https://lunaaa-copy.firebaseio.com",
   projectId: "lunaaa-copy",
   storageBucket: "lunaaa-copy.appspot.com",
   messagingSenderId: "269170847279",
   appId: "1:269170847279:web:e4a5e056711c84bf"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
let database = firebase.database()
let x
let y
let a
let b
let k
let j
let g
let r
let enemyCount
enemyCount = 3 
let direction_s1
let direction_m1
let direction_s
let direction_m
let score
let level
let time = 10
let cat = document.getElementById("cat")
let scoreboard = {  }

function setup() {
  createCanvas(windowWidth, windowHeight)
  x = 125
  y = 145
  a = 335
  b = 403
  direction = 1
  direction_s = 1
  direction_m = 1
  score=5
  level = 1
  k = [ 80, 100, 200]
  j = [ 400, 50, 100]
  direction_s1 = [ 1, 1, 1]
  direction_m1 = [ 1, 1, 1]
  a = 90
  r = 80
}

function draw() {
  if (time > 0) {


  background(190);
  fill(210,192,203)
  circle(x,y,34)
  circle(a,b,44)
  circle(k,j,54)
	  if (touches.length == 0) {
  
   if (keyIsDown(LEFT_ARROW)) {
    x = x - 8
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 8
  }
   if (keyIsDown(UP_ARROW)) {
    y = y - 8
  }
   if (keyIsDown(DOWN_ARROW)) {
    y = y + 8
  }
else { 
		__ = touches[0].x
		__ = touches[0].y
}

  fill(128,255,321)
  circle(a,b,32)
  a = a + 10 *direction_s
  //b = b + 3
  if ( a > width || a < 0 ) {
	direction_s = direction_s * -1
  }

  
  textSize(30)
  text("score: " + score, 500, 100)
  text("time: " + time.toFixed(0), 500,300)
  time=time-0.10 

  if (dist( x, y, a, b) < 34 + 44) {
  score = score + 1  
  }
  if (dist( x, y, k, j) < 34 + 54) {
  score = score - 1  
  }
for (i=0; i<enemyCount; i=i+1) {
  fill(255,100,50)
  circle(k[i] , j[i], 10) 
  k[i]= k[i] + 10*direction_s1[i]
  j[i]= j[i] + 10*direction_m1[i]
  
  if (k[i] > width || k[i] < 0) {
    direction_s1[i] = direction_s1[i] * -1
    }
  if (j[i] > height || j[i] < 0) {
    direction_m1[i] = direction_m1[i] * -1
    }
  if (dist( x, y, k[i], j[i])< 5 + 25) {
      score= score - 1
    }  
  }
  if (score > 100 && level == 1) {
    enemyCount = enemyCount + 1
    level = 2
    direction_s1.push.apply(direction_s1, [1])
     direction_m1.push.apply(direction_m1, [1])
    k.push.apply(k, [300])
    j.push.apply(j, [500])
  }
  if (score > 175 && level == 2) {
    enemyCount = enemyCount + 2
    level = 3
    direction_s1.push.apply(direction_s1, [1,1])
     direction_m1.push.apply(direction_m1, [1,1])
    k.push.apply(k, [300,700])
    j.push.apply(j, [500,200])
  }
  if (score > 250 && level == 3) {
    enemyCount = enemyCount + 3
    level = 4
    direction_s1.push.apply(direction_s1, [1,1,1])
     direction_m1.push.apply(direction_m1, [1,1,1])
    k.push.apply(k, [300,400,150])
    j.push.apply(j, [500,600,900])
  }
  if (score > 325 && level == 4) {
    enemyCount = enemyCount + 1
    level = 5
    direction_s1.push.apply(direction_s1, [1])
     direction_m1.push.apply(direction_m1, [1])
    k.push.apply(k, [300])
    j.push.apply(j, [500])
  }

}
else {
  cat.innerHTML = "Name?<input id=dog><button onclick='restart()'>Restart</button><button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button>"
noLoop()
}
  
  
  
}
function restart() { 
        let dog = document.getElementById("dog")
		name = dog.value 
		if (name != "") { 
			scoreboard[name] = score
			database.ref(name).set(score)
		}
alert("Scoreboard:"+JSON.stringify(scoreboard,null,1)) 
		time = 10
		score = 0
		loop()
		cat.innerHTML = ""
		generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
