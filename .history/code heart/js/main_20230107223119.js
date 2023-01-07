let particles = [];
let microparticles = [];

const c1 = createCanvas({
  width: $(window).width(),
  height: $(window).height(),
});

const tela = c1.canvas;
const canvas = c1.context;

// $("body").append(tela);
$("body").append(c1.canvas);

class Particle1 {
  constructor(canvas) {
    this.random = Math.random();
    this.random1 = Math.random();
    this.random2 = Math.random();
    this.progress = 0;
    this.canvas = canvas;
    this.life = 1000 + Math.random() * 3000;

    this.x = $(window).width() / 2 + (Math.random() * 20 - Math.random() * 20);
    this.y = $(window).height();
    this.s = 2 + Math.random();
    this.w = $(window).width();
    this.h = $(window).height();
    this.direction = this.random > 0.5 ? -1 : 1;
    this.radius = 1 + 3 * this.random;
    this.color = "#ff417d";

    this.ID = setInterval(
      function () {
        microparticles.push(
          new microParticle(c1.context, {
            x: this.x,
            y: this.y,
          })
        );
      }.bind(this),
      this.random * 20
    );

    setTimeout(
      function () {
        clearInterval(this.ID);
      }.bind(this),
      this.life
    );
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // this.canvas.lineWidth = 2;
    this.canvas.shadowOffsetX = 0;
    this.canvas.shadowOffsetY = 0;
    // this.canvas.shadowBlur = 6;
    this.canvas.shadowColor = "#000000";
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    this.x -=
      this.direction * Math.sin(this.progress / (this.random1 * 430)) * this.s;
    this.y -= Math.cos(this.progress / this.h) * this.s;

    if (this.x < 0 || this.x > this.w - this.radius) {
      clearInterval(this.ID);
      return false;
    }

    if (this.y < 0) {
      clearInterval(this.ID);
      return false;
    }
    this.render();
    this.progress++;
    return true;
  }
}

class microParticle {
  constructor(canvas, options) {
    this.random = Math.random();
    this.random1 = Math.random();
    this.random2 = Math.random();
    this.progress = 0;
    this.canvas = canvas;

    this.x = options.x;
    this.y = options.y;
    this.s = 2 + Math.random() * 3;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = 1 + this.random * 0.5;
    this.color = "#4EFCFE"; //this.random > .5 ? "#a9722c" : "#FFFED7"
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    this.x -=
      Math.sin(this.progress / (100 / (this.random1 - this.random2 * 10))) *
      this.s;
    this.y += Math.cos(this.progress / this.h) * this.s;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y > this.h) {
      return false;
    }
    this.render();
    this.progress++;
    return true;
  }
}

var random_life = 1000;

setInterval(
  function () {
    particles.push(new Particle1(canvas));
    random_life = 2000 * Math.random();
  }.bind(this),
  random_life
);

function clear() {
  let grd = canvas.createRadialGradient(
    tela.width / 2,
    tela.height / 2,
    0,
    tela.width / 2,
    tela.height / 2,
    tela.width
  );
  grd.addColorStop(0, "rgba(20,20,20,1)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  // Fill with gradient
  canvas.globalAlpha = 0.16;
  canvas.fillStyle = grd;
  canvas.fillRect(0, 0, tela.width, tela.height);
}

function blur(ctx, canvas, amt) {
  // ctx.filter = `blur(${amt}px)`
  // ctx.drawImage(canvas, 0, 0)
  // ctx.filter = 'none'
}

function update() {
  clear();
  particles = particles.filter(function (p) {
    return p.move();
  });
  microparticles = microparticles.filter(function (mp) {
    return mp.move();
  });
  requestAnimationFrame(update.bind(this));
}

function createCanvas(properties) {
  let canvas = document.createElement("canvas");
  canvas.width = properties.width;
  //   canvas.style.zIndex = 999;
  canvas.height = properties.height;
  let context = canvas.getContext("2d");
  return {
    canvas: canvas,
    context: context,
  };
}

update();

/*Lấy thời gian tết âm lịch (mily giây)*/
var tetAmLich = new Date(2021, 1, 12, 0, 0, 0).getTime();

function newYear() {
  /*Lấy thời gian ngày hiện tại (mily giây) */
  var ngayHienTai = new Date().getTime();

  /*Tính thời gian còn lại (mily giây) */
  thoigianConLai = tetAmLich - ngayHienTai;

  /*Chuyển đơn vị thời gian tương ứng sang mili giây*/
  var giay = 1000;
  var phut = giay * 60;
  var gio = phut * 60;
  var ngay = gio * 24;

  /*Tìm ra thời gian theo ngày, giờ, phút giây còn lại thông qua cách chia lấy dư(%) và làm tròn số(Math.floor) trong Javascript*/
  var d = Math.floor(thoigianConLai / ngay);
  var h = Math.floor((thoigianConLai % ngay) / gio);
  var m = Math.floor((thoigianConLai % gio) / phut);
  var s = Math.floor((thoigianConLai % phut) / giay);

  /*Hiển thị kết quả ra các thẻ Div với ID tương ứng*/
  document.getElementById("day").innerText = d;
  document.getElementById("hour").innerText = h;
  document.getElementById("minute").innerText = m;
  document.getElementById("second").innerText = s;
}

/*Thiết Lập hàm sẽ tự động chạy lại sau 1s*/
setInterval(function () {
  console.log("sdfkljdsfl");
  newYear();
}, 1000);
