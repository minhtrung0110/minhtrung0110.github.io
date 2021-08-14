const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app={
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
   config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs:[
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
            image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
          },
          {
            name: 'Light It Up',
            singer: 'Robin Hustin x TobiMorrow',
            path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
          },
           {
            name: 'Đừng Như Thói Quen',
            singer: 'JayKii & Sara Lưu',
            path: 'https://dl173.dlmate30.xyz/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyaGh1NEYvbmtCbUpQb0poSzlxOXNhdUpJSmhKdUlzbTgrQVFaVmcvWHY3SXBXcFl3YkNoNDBqVERqSzNkY2tzamJHdUlnMEV2cHdSQmV6dDZPQXdIUlUyUksrY3NIZkhMc2RlMzUvcGs4dDNqYkFpdmZkdFJESG8zeTVyeERHUGdJVHZTNGZLUGZWdE0xdTJIbVlLcVhDMHRWWGl6L043NXRkMzc2ZXV3eTlqdms2cmRKeVlVcDhacTlKMFpYODRPSFpvRWttaXBnRjBVU3RsdVN5T1kwMERxU2hkU0psQVM0USsrYnNZdzBYeXlBUngwZXQyWU53NHpjOFFLOU1wbStrcXJUc2ZpK1JiTWZpUnB5QmQ3bnI5SjJndDZ3MzdoS0h0ZXJkbWNjVXhGM3dHNWl0QU1JZTdGdzE4UFE9',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
          },
          {
            name: 'Mới Mẻ Ngọt Ngào',
            singer: 'Mr Siro',
            path: 'https://dl239.dlmate07.xyz/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0ozZkJyZ2pJQlJQSnVyOFlDa3NIeFp1dHVhNFV0aHFUbk1vMFIxRzdYT3ZQT0Uxck1sOEVvUlRpdjhKTVk2SHJ0MGN0NGZkMDZlQkc5dUxYbXQyRjV3a3pZYkpQK0hLcFpKanhMcWtGdDNHMmx5ZVBIc0JyMi9YQzk5QXVGWlNnUGpTc0tLZjJOdE0xdXpHYmVlK0xtMXRWWGl5dVBzZDhiL1BIWTVpZnZrYjgvck5rN1hVdDVPTjBXMUpYODRQM0pta2tZajZZZnowT2psdXloQ1lvS0VxS2ZkZ2g5TEIwYTRQM2dZd3NYemlzUngzcTc1THdzNFc0MlEvZFUySFNuMXNQZmFHL1djOUtsQ1pTY091R3ZvOUh3Ny93ODdoZVQvcnFTeWNnWnowNjBRZEw2RzRWYjVoeHk4ZkhGOXRwcjBVRHJqdz09',
            image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/6/7/3/c/673c044865350452518372c32c881aa0.jpg',
          },
          {
            name: 'Thrd!Life SLEEPWALKRS ',
            singer: 'OUTTA MY HEAD',
            path: 'https://dl58.dlmate19.xyz/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1FzT2NlNnpZR1N1Qi9pcWdLNTlPQkQrSjlIZXhFNHIrV0pmOGYyQWVUV2ZXcUZFR0Vwc3RnUkhxTjh1a3R1Q3ZIcnN0eWY5QitRd0x0bWVQbXhCZDdtVlN3TFA3TFVPcHdkQ1Yyb2xSbW5TV2N3YnFaOGdId29YbWhvVWk4ZnlnUHR5c2NQUG5iNDR4MzJuemZlL2JiM29rNnBTT2U1cVZRNDlPZjRUV3YrWWdtalpKNFRoY3lkb2hOMElqd3kvbkJvQnBJMXN0RWd4anc4THYxUUkwOEJxRERLMkFnYjNOUXY2bjhTa1lOMlhkUA%3D%3D',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
          },
          {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
          },
          {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
          },
         
          {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
          },
          {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
          },
          {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
          },
          {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
          },
          {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
          },],
          setConfig: function (key, value) {
            this.config[key] = value;
            // (2/2) Uncomment the line below to use localStorage
            // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
          },
          render: function () {
            const htmls = this.songs.map((song, index) => {
              return `
                                <div class="song ${
                                  index === this.currentIndex ? "active" : ""
                                }" data-index="${index}">
                                    <div class="thumb"
                                        style="background-image: url('${song.image}')">
                                    </div>
                                    <div class="body">
                                        <h3 class="title">${song.name}</h3>
                                        <p class="author">${song.singer}</p>
                                    </div>
                                    <div class="option">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </div>
                                </div>
                            `;
            });
            playlist.innerHTML = htmls.join("");
          },
          defineProperties: function () {
            Object.defineProperty(this, "currentSong", {
              get: function () {
                return this.songs[this.currentIndex];
              }
            });
          },
          handleEvents: function () {
            const _this = this;
            const cdWidth = cd.offsetWidth;
        
            // Xử lý CD quay / dừng
            // Handle CD spins / stops
            const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
              duration: 10000, // 10 seconds
              iterations: Infinity
            });
            cdThumbAnimate.pause();
        
            // Xử lý phóng to / thu nhỏ CD
            // Handles CD enlargement / reduction
            document.onscroll = function () {
              const scrollTop = window.scrollY || document.documentElement.scrollTop;
              const newCdWidth = cdWidth - scrollTop;
        
              cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
              cd.style.opacity = newCdWidth / cdWidth;
            };
        
            // Xử lý khi click play
            // Handle when click play
            playBtn.onclick = function () {
              if (_this.isPlaying) {
                audio.pause();
              } else {
                audio.play();
              }
            };
        
            // Khi song được play
            // When the song is played
            audio.onplay = function () {
              _this.isPlaying = true;
              player.classList.add("playing");
              cdThumbAnimate.play();
            };
        
            // Khi song bị pause
            // When the song is pause
            audio.onpause = function () {
              _this.isPlaying = false;
              player.classList.remove("playing");
              cdThumbAnimate.pause();
            };
        
            // Khi tiến độ bài hát thay đổi
            // When the song progress changes
            audio.ontimeupdate = function () {
              if (audio.duration) {
                const progressPercent = Math.floor(
                  (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
              }
            };
        
            // Xử lý khi tua song
            // Handling when seek
            progress.oninput = function(e){
              // từ số phần trăm của giây convert sang giây
              const seekTime = audio.duration / 100 * e.target.value; 
              audio.currentTime = seekTime;
              audio.play();
          }
        
            // Khi next song
            // When next song
            nextBtn.onclick = function () {
              if (_this.isRandom) {
                _this.playRandomSong();
              } else {
                _this.nextSong();
              }
              audio.play();
              _this.render();
              _this.scrollToActiveSong();
            };
        
            // Khi prev song
            // When prev song
            prevBtn.onclick = function () {
              if (_this.isRandom) {
                _this.playRandomSong();
              } else {
                _this.prevSong();
              }
              audio.play();
              _this.render();
              _this.scrollToActiveSong();
            };
        
            // Xử lý bật / tắt random song
            // Handling on / off random song
            randomBtn.onclick = function (e) {
              _this.isRandom = !_this.isRandom;
              _this.setConfig("isRandom", _this.isRandom);
              randomBtn.classList.toggle("active", _this.isRandom);
            };
        
            // Xử lý lặp lại một song
            // Single-parallel repeat processing
            repeatBtn.onclick = function (e) {
              _this.isRepeat = !_this.isRepeat;
              _this.setConfig("isRepeat", _this.isRepeat);
              repeatBtn.classList.toggle("active", _this.isRepeat);
            };
        
            // Xử lý next song khi audio ended
            // Handle next song when audio ended
            audio.onended = function () {
              if (_this.isRepeat) {
                audio.play();
              } else {
                nextBtn.click();
              }
            };
        
            // Lắng nghe hành vi click vào playlist
            // Listen to playlist clicks
            playlist.onclick = function (e) {
              const songNode = e.target.closest(".song:not(.active)");
        
              if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                  _this.currentIndex = Number(songNode.dataset.index);
                  _this.loadCurrentSong();
                  _this.render();
                  audio.play();
                }
        
                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {
                }
              }
            };
          },// cần fix lại khi ấn vào nút 3 chấm ko cho chuyển bài
          scrollToActiveSong: function () {
            setTimeout(() => {
              if (this.currentIndex <= 2) {
                $('.song.active').scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                });
              } else {
                $('.song.active').scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            }, 300);
          },
        
          loadCurrentSong: function () {
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
          },
          loadConfig: function () {
            this.isRandom = this.config.isRandom;
            this.isRepeat = this.config.isRepeat;
          },
          nextSong: function () {
            this.currentIndex++;
            if (this.currentIndex >= this.songs.length) {
              this.currentIndex = 0;
            }
            this.loadCurrentSong();
          },
          prevSong: function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
              this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();
          },
          playRandomSong: function () {
            let newIndex;
            do {
              newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentIndex);
        
            this.currentIndex = newIndex;
            this.loadCurrentSong();
          },
          start: function () {
            // Gán cấu hình từ config vào ứng dụng
            // Assign configuration from config to application
            this.loadConfig();
        
            // Định nghĩa các thuộc tính cho object
            // Defines properties for the object
            this.defineProperties();
        
            // Lắng nghe / xử lý các sự kiện (DOM events)
            // Listening / handling events (DOM events)
            this.handleEvents();
        
            // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
            // Load the first song information into the UI when running the app
            this.loadCurrentSong();
        
            // Render playlist
            this.render();
        
            // Hiển thị trạng thái ban đầu của button repeat & random
            // Display the initial state of the repeat & random button
            randomBtn.classList.toggle("active", this.isRandom);
            repeatBtn.classList.toggle("active", this.isRepeat);
          }
        };
        
        app.start();
