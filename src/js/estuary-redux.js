
   
      /// Calcuate Video Time(s) 
      const interval = setInterval(function() {
        // This calcuates the bottom video duration
        vid = document.getElementById("video");
        var nt = vid.currentTime * (100 / vid.duration);
        curtimetext = document.getElementById("curtimetext");
        durtimetext = document.getElementById("durtimetext");
        var curmins = Math.floor(vid.currentTime / 60);
        var cursecs = Math.floor(vid.currentTime - curmins * 60);
        // DurHours is used for Ends At Function
        var durhours = Math.floor(vid.currentTime / 3600);
        // DurHours is used for Ends At Function
        var durhours = Math.floor(vid.currentTime / 3600);
        var durmins = Math.floor(vid.duration / 60);
        var dursecs = Math.floor(vid.duration - durmins * 60);
        if (cursecs < 10) {
          cursecs = "0" + cursecs;
        }
        if (dursecs < 10) {
          dursecs = "0" + dursecs;
        }
        if (curmins < 10) {
          curmins = "0" + curmins;
        }
        if (durmins < 10) {
          durmins = "0" + durmins;
        }
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
        // This is required for Ends At Hour
        var EndsAt_Hours = durmins - curmins;
        var EndsAt_Mins = durmins - curmins;
        // Video Ends at Function 
        var now = new Date();
        var TwentyFourHour = now.getHours();
        var nowHours = now.getHours();
        var mid = 'PM';
        if (TwentyFourHour < 12) {
          mid = 'AM';
        }
        if (nowHours == 0) {
          nowHours = 12;
        }
        var nowMinutes = now.getMinutes();
        if (nowMinutes < 10) {
          nowMinutes = "0" + nowMinutes;
        }
        var hours = durhours;
        var addHours = parseFloat(hours) + parseFloat(nowHours);
        var minutes = EndsAt_Mins;
        var addMinutes = parseFloat(minutes) + parseFloat(nowMinutes);
        if (hours == '') {
          addHours = nowHours;
        }
        if (minutes == '') {
          addMinutes = nowMinutes;
        }
        if (addMinutes >= 60) {
          var newHours = ((minutes / 60));
          if (newHours > 1) {
            addMinutes = addMinutes % 60 + newHours * (newHours % 1);
            addMinutes = Math.floor(addMinutes);
            addHours = addHours + Math.floor(newHours);
          } else {
            addMinutes = addMinutes % 60 + newHours * (newHours % 1);
            addMinutes = Math.floor(addMinutes);
            addHours = addHours + 1;
          }
        }
        if (addHours > 12) {
          addHours = addHours % 12;
          if (addHours == 0) {
            addHours = 12;
          }
        }
        if (addMinutes < 10) {
          addMinutes = "0" + addMinutes;
        }
        var total = addHours + ":" + addMinutes;
        Duration_Minutes = document.getElementById("minutes");
        Duration_Hours = document.getElementById("hour");
        Duration_Hours.innerHTML = addHours;
        Duration_Minutes.innerHTML = addMinutes + mid;
      }, 100);
   
      function Stop_Player() {
        var AlbumCoverProgress = document.getElementById("album_cover_progress");
        AlbumCoverProgress.style.opacity = "0";
        var AlbumCoverContainer = document.querySelector('.AlbumCoverContainer');
        AlbumCoverContainer.style.display = "none";
        video.src = "";
        VideoTitle.innerHTML = "";
        VideoGenre.innerHTML = "";
        video.pause();
      }

      var player_background = document.querySelector('.bg-video-wrap');
      var video = document.querySelector('#video');
      var pauseBtn = document.querySelector('.pause-button');
      var playBtn = document.querySelector('.play-button');
      var Video_Settings_Menu = document.querySelector('.video-settings-menu');
      var Video_Settings_Menu_Items = document.querySelector('.video-settings-menu');
      var Video_Settings_Btn = document.querySelector('.movie-settings-button');
      var Video_Paused_Display = document.querySelector('.Display-Video-Paused');
      var Video_Progress_Time = document.querySelector('.play-time');
      var MovieInfoSection = document.querySelector('.movie-info-header');
      var MovieInfoBtn = document.querySelector('.movie-info-button');
      var SubtitleBtn = document.querySelector('.movie-subtitle-button');
      var progressSlider = document.querySelector('.progress');
      var progressFill = document.querySelector('.progress-filled');
      var AlbumCoverMode_progressSlider = document.querySelector('.album_cover_progress');
      var AlbumCoverMode_progressSliderFill = document.getElementById('albumcoverprogress_filled');

      function updateProgress(e) {
        progressFill.style.width = `${video.currentTime/video.duration*100}%`;
        AlbumCoverMode_progressSliderFill.style.width = `${video.currentTime/video.duration*100}%`;
      }

      function setProgress(e) {
        const newTime = e.offsetX / progressSlider.offsetWidth;
        progressFill.style.width = `${newTime*100}%`;
        video.currentTime = newTime * video.duration;
      }
      //PLAYER FUNCTIONS
      // Hide Subtitles on Default
      for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
      }

      function togglePause() {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        pauseBtn.style.display = "none";
        Video_Paused_Display.style.display = "block";
        playBtn.style.display = "block";
        Video_Progress_Time.style.top = "325px";
      }

      function togglePlay() {
        video.play();
        pauseBtn.style.display = "block";
        Video_Paused_Display.style.display = "none";
        playBtn.style.display = "none";
        Video_Progress_Time.style.top = "335px";
      }
      var NextBtn = document.querySelector('.next-chapter-button');
      var i = 0;

      function NextItem() {
        var videoPlayer = document.getElementById('video');
        i = i + 1; // increase i by one
        // if we've gone too high, start from `0` again
        ChangeVideoSource(VideoSources[i], VideoTitles[0], VideoGenres[0], AlbumCovers[0]);
        UpdateVideoCardInfo(AlbumCovers[0], VideoTitles[0], VideoGenres[0]);
        if (i === 0) {
          videoPlayer.onended = function() {
            Stop_Player();
            window.open("#", "_self")
          }
        }
      }
      var MovieInfoBtn_clicks = 0;

      function MovieInfo() {
        MovieInfoSection.style.display = "block";
        opacity: 0;
        MovieInfoBtn_clicks += 1;
        if (MovieInfoBtn_clicks == 2) {
          MovieInfoSection.style.display = "none";
          opacity: 1;
          MovieInfoBtn_clicks = 0;
        }
      }
      // Subtitles Settings Menu Functions
      function ShowSubtitlesSettingsMenu() {
        var SubtitlesSettingsMenu = document.getElementById("SubtitlesSettingsMenu");
        SubtitlesSettingsMenu.style.opacity = "1";
        SubtitlesSettingsMenu.style.zIndex = "1000";
      }

      function HideSubtitlesSettingsMenu() {
        var SubtitlesSettingsMenu = document.getElementById("SubtitlesSettingsMenu");
        SubtitlesSettingsMenu.style.opacity = "0";
        SubtitlesSettingsMenu.style.zIndex = "0";
      }
      // Subtitles 
      // Detect Toggle Check On / Off  
      function ToggleSubtitles() {
        var Toggle = document.getElementById("SubtitlesToggleSwitch");
        if (Toggle.checked) {
          for (var i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode = 'showing';
          }
        } else {
          for (var i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode = 'hidden';
          }
        }
      }

      function VideoSettings_Menu() {
        Video_Settings_Menu.style.display = "block";
      }

      function VideoSettings_Menu_Click() {
        Video_Settings_Menu.style.display = "none";
      }
      SubtitleBtn.addEventListener('click', ShowSubtitlesSettingsMenu);
      pauseBtn.addEventListener('click', togglePause);
      playBtn.addEventListener('click', togglePlay);
      NextBtn.addEventListener('click', NextItem);
      MovieInfoBtn.addEventListener('click', MovieInfo);
      Video_Settings_Btn.addEventListener('click', VideoSettings_Menu);
      Video_Settings_Menu_Items.addEventListener('click', VideoSettings_Menu_Click);
      video.addEventListener('timeupdate', updateProgress);
      progressSlider.addEventListener('click', setProgress);

      /// Video / Audio Playlist 
      function VideoPlayList() {
        var videoPlayer = document.getElementById('video');
        if (VideoSources.length > 0) {
          videoPlayer.onended = function() {
            ChangeVideoSource(VideoSources[0], VideoTitles[0], VideoGenres[0], AlbumCovers[0]);
            UpdateVideoCardInfo(AlbumCovers[0], VideoTitles[0], VideoGenres[0]);
            if (VideoSources.length === 0) {
              Stop_Player();
              window.open("#", "_self")
            } else {
              videoPlayer.play();
              VideoSources.shift();
              VideoTitles.shift();
              VideoGenres.shift();
              AlbumCovers.shift();
            }
          }
        }
      }    
       

      
      //on screen keyboard
      const container = document.querySelector(".keyboard_container");
      const textarea = document.querySelector(".text");
      const alphabet = document.querySelectorAll(".alpha");
      const key = document.querySelectorAll(".key");
      var capsLock = document.getElementById("keyCaps");
      let checkCaps = false;
      let checkLights = false;
      //CAPSLOCK
      const caps = function() {
        capsLock.classList.toggle('active');
        if (checkCaps == false) {
          for (let i = 0; i < alphabet.length; i++) {
            let getAlpha = alphabet[i].textContent;
            const up = getAlpha.toUpperCase();
            alphabet[i].textContent = up;
          }
          checkCaps = true;
        } else {
          for (let i = 0; i < alphabet.length; i++) {
            let getAlpha = alphabet[i].textContent;
            const low = getAlpha.toLowerCase();
            alphabet[i].textContent = low;
          }
          checkCaps = false;
        }
      };
      //Lights
      const blink = function() {
        if (checkLights == false) {
          key.forEach((key) => key.classList.add("lightOn"));
          checkLights = true;
        } else {
          key.forEach((key) => key.classList.remove("lightOn"));
          checkLights = false;
        }
      };
      //Event listener
      container.addEventListener("click", function(e) {
        if (e.target.classList.contains("key")) {
          if (e.target.classList.contains("keySpace")) {
            textarea.textContent += " ";
          }
          if (e.target.classList.contains("caps")) {
            caps();
          }
          if (e.target.classList.contains("content")) {
            const getContent = e.target.textContent;
            textarea.textContent += getContent;
          }
          if (e.target.classList.contains("backSpace")) {
            textarea.textContent = textarea.textContent.substring(
              0,
              textarea.textContent.length - 1
            );
          }
          if (e.target.classList.contains("light")) {
            blink();
          }
        } else {
          return;
        }
      });

      function KeyBoardCancel() {
        var KeyboardInput = document.querySelector('.text');
        KeyboardInput.textContent = "";
      }


  ///// end of on - screen keyboard. 

      function ChangeVideoSource(src, title, genre, albumCoverArt) {
        var progressFill = document.querySelector('.progress-filled');
        progressFill.style.width = `0px`
        var Video = document.getElementById("video")
        var VideoTitle = document.getElementById("VideoTitle")
        var VideoGenre = document.getElementById("VideoGenre")
        var AlbumCoverContainer = document.querySelector('.AlbumCoverContainer');
        ResultVolumeSettings();
        var PlayerOverlay = document.getElementById("VideoPlayer-Popup")
        var AlbumCoverProgress = document.getElementById("album_cover_progress");
        var AlbumCoverProgressSlider = document.getElementById("albumcoverprogress_filled");
        if (albumCoverArt) {
          var AlbumCoverImage = document.getElementById("AlbumArt").src = albumCoverArt;
          document.getElementById("AlbumArtSong").innerHTML = title;
          document.getElementById("AlbumArtArtist").innerHTML = genre;
          AlbumCoverProgress.style.opacity = "1";
          AlbumCoverContainer.style.display = "block";
          AlbumCoverContainer.style.backgroundImage = "red";
          PlayerOverlay.style.background = "linear-gradient(to right, rgb(6, 38, 52), rgb(7, 51, 65))";
        } else {
          AlbumCoverProgress.style.opacity = "0";
          PlayerOverlay.style.background = " rgba(0, 0, 0, 0.7)";
          AlbumCoverContainer.style.display = "none";
          var AlbumCoverImage = document.getElementById("AlbumArt").src = "";
        }
        Video.src = src;
        VideoTitle.innerHTML = title;
        VideoGenre.innerHTML = genre;
      }

      var KeyboardInput = (function(GetKeyboardInput) {
        return function() {
          var Final_Keyboard_Text = document.querySelector('.text');
          GetKeyboardInput = Final_Keyboard_Text.textContent
          Final_Keyboard_Text.textContent = "";
          return GetKeyboardInput;
        }
      }());

      function KeyBoardDemo() {
        document.getElementById("SearchedText").innerHTML = ("No search results for   " + KeyboardInput());
      };
   
      /*-- Quick n' dirty css toggler function --*/
        function toggleActive(t) {
          document.getElementById(t).classList.toggle("active");
        }

        // Clock
        window.onload = function () {
          clock();
          function clock() {
            var now = new Date();
            var TwentyFourHour = now.getHours();
            var hour = now.getHours();
            var min = now.getMinutes();
            var mid = "PM";
            if (min < 10) {
              min = "0" + min;
            }
            if (hour > 12) {
              hour = hour - 12;
            }
            if (hour == 0) {
              hour = 12;
            }
            if (TwentyFourHour < 12) {
              mid = "AM";
            }

            var clocks = document.getElementsByClassName("clock");

            for (var i = 0; i < clocks.length; i++) {
              clocks[i].innerHTML = hour + ":" + min + " " + mid;
            }

            setTimeout(clock, 1000);
          }
        };

        // Right Click Menu

        const menu = document.getElementById("context-menu");
        const outClick = document.getElementById("out-click");

        outClick.addEventListener("click", () => {
          menu.classList.remove("show");
          outClick.style.display = "none";
        });

        const clickable = document.getElementById("swipe_card_item");

        clickable.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          var Style = e.clientY - 150;
          menu.style.top = `${Style}px`;
          menu.style.left = `${e.clientX}px`;
          menu.classList.add("show");

          outClick.style.display = "block";
        });

        // Progress Bar Animation
        function ProgressBarAnimation() {
          var ProgressBar = document.querySelector(
            '.Dialog-Menu-1-slider span[role="position"]'
          );

          var ProgressBar_Percentage = document.querySelector(
            ".progress_slider_animation"
          );
          ProgressBar.classList.add("ProgressBar_Animation");

          ProgressBar.addEventListener("animationend", function () {
            setTimeout(function () {
              ProgressBar.classList.remove("ProgressBar_Animation");
            }, 2000);
          });
        }

        // Swiper for Libray Items
        const swiper = new Swiper(".swiper-container", {
          // Optional parameters
          loop: false,
          slidesPerView: 4.5,
          spaceBetween: 30,

          breakpoints: {
            // when window width is >= 320px
            300: {
              slidesPerView: 1.5
            },
            // when window width is >= 480px
            600: {
              slidesPerView: 2.5
            },
            // when window width is >= 640px
            900: {
              slidesPerView: 3.5
            },
            1200: {
              slidesPerView: 4.5
            }
          }
        });

        /// Video Player Functions

        // Subtitles Settings Menu Functions

        // Subtitles

        // Detect Toggle Check On / Off

        function ToggleSubtitles() {
          var Toggle = document.getElementById("SubtitlesToggleSwitch");
          if (Toggle.checked) {
            for (var i = 0; i < video.textTracks.length; i++) {
              video.textTracks[i].mode = "showing";
            }
          } else {
            for (var i = 0; i < video.textTracks.length; i++) {
              video.textTracks[i].mode = "hidden";
            }
          }
        }
        // Show Subtitle Menus

        function ShowSubtitlesSettingsMenu() {
          var SubtitlesSettingsMenu = document.getElementById("SubtitlesSettingsMenu");
          SubtitlesSettingsMenu.style.display = "block";
          SubtitlesSettingsMenu.style.opacity = "1";
          SubtitlesSettingsMenu.style.zIndex = "1000";
        }

        // Hide Subttle Menu
        function HideSubtitlesSettingsMenu() {
          var SubtitlesSettingsMenu = document.getElementById("SubtitlesSettingsMenu");

          SubtitlesSettingsMenu.style.display = "none";
          SubtitlesSettingsMenu.style.opacity = "0";
          SubtitlesSettingsMenu.style.zIndex = "0";
        }

        //// End Of Subtitle

        /// Library Items

        var No_Info_Item_Text = document.getElementById("ItemLibrary_NoInfoText");

        var No_Info_Item_Icon = document.querySelector(".Icon_Section");

        var ShowLibraryItemInfo = document.querySelector(
          ".Library_Item_Details_Section"
        );

        function Show_NoInfo_Item() {
          ShowLibraryItemInfo.style.opacity = "0";
          No_Info_Item_Text.style.opacity = "1";
          No_Info_Item_Icon.style.opacity = "1";
        }

        function Hide_No_Info_Item() {
          ShowLibraryItemInfo.style.opacity = "1";
          No_Info_Item_Text.style.opacity = "0";
          No_Info_Item_Icon.style.opacity = "0";
        }

        // Options Menu Functions

        function ShowOptionsMenu() {
          var Options_Menu = document.getElementById("Options_Menu");

          Options_Menu.style.opacity = "1";
          Options_Menu.style.width = "300px";
          Options_Menu.style.zIndex = "10";
        }

        function HideOptionsMenu() {
          var Options_Menu = document.getElementById("Options_Menu");

          Options_Menu.style.opacity = "0";
          Options_Menu.style.width = "230px";
          Options_Menu.style.zIndex = "-1";
        }

        // Update Video Card

        function UpdateVideoCardInfo(Image, Title, Description) {
          var VideoCard_Image = document.getElementById("VideoCard_Image");

          var VideoCard_Title = document.getElementById("VideoCard_ShortTitle");

          var VideoCard_Description = document.getElementById("VideoCard_Description");

          VideoCard_Image.src = Image;
          VideoCard_Title.innerHTML = Title;
          VideoCard_Description.innerHTML = Description;
        }

        // Audio Settings Menu

        // Audio Settings Menu Functions

        function ShowAudioSettingsMenu() {
          var AudioSettingsMenu = document.getElementById("AudioSettingsMenu");
          AudioSettingsMenu.style.display = "block";
          AudioSettingsMenu.style.opacity = "1";
          AudioSettingsMenu.style.zIndex = "1000";
        }

        function HideAudioSettingsMenu() {
          var AudioSettingsMenu = document.getElementById("AudioSettingsMenu");
          AudioSettingsMenu.style.display = "none";
          AudioSettingsMenu.style.opacity = "0";
          AudioSettingsMenu.style.zIndex = "0";
        }

        // Volume Settings

        var ResultVolumeSettings = function () {
          var video = document.getElementById("video");

          video.volume = 1.0;

          var VolumeStepper = document.getElementById("VolumeStepper");

          var video = document.getElementById("video");

          VolumeStepper.value = 0;

          var target = document.getElementById("VolumeStepper_Value");
          target.innerHTML = "<p>" + 0 + "</p>";
        };

        var rangeValue = function () {
          // Volume Stepper
          var VolumeStepper = document.getElementById("VolumeStepper");

          var video = document.getElementById("video");

          var newValue = VolumeStepper.value;
          if (newValue == 0) {
            video.volume = 1.0;
          } else {
            video.volume = `0.${newValue}`;
          }
          if (newValue == 100) {
            video.volume = 0.0;
          }

          if (newValue > 0) {
            var NegativeVolume = "-";
          } else {
            var NegativeVolume = "";
          }
          var target = document.getElementById("VolumeStepper_Value");
          target.innerHTML = "<p>" + newValue + NegativeVolume + "</p>";
        };

        VolumeStepper.addEventListener("input", rangeValue);

        // Volume Amplification Toggle Switch

        var VolumeAmplificationValue = function () {
          // Volume Stepper
          var Volume_Amplification_Stepper = document.getElementById(
            "Volume_Amplification_Stepper"
          );

          var video = document.getElementById("video");

          var newValue = Volume_Amplification_Stepper.value;
          var videoplayer = document.getElementById("video");

          amplifyMedia(videoplayer, newValue);

          var target = document.getElementById("Volume_Amplification_Stepper_Value");
          target.innerHTML = "<p>" + newValue + "</p>";
        };

        Volume_Amplification_Stepper.addEventListener(
          "input",
          VolumeAmplificationValue
        );

        // Volume Amplification

        function amplifyMedia(mediaElem, multiplier) {
          var context = new (window.AudioContext || window.webkitAudioContext)(),
            result = {
              context: context,
              gain: context.createGain(),
              media: mediaElem,
              amplify: function (multiplier) {
                result.gain.gain.value = multiplier;
              },
              getAmpLevel: function () {
                return result.gain.gain.value;
              }
            };

          if (context.source == undefined) {
            // Build element
            result.source = context.createMediaElementSource(mediaElem);
          }

          result.source.connect(result.gain);
          result.gain.connect(context.destination);
          result.amplify(multiplier);
          return result;
        }

        // Notification

        var Default_Time = 3000;
        var Notification_Count = 0;
        function ShowNotification(icon, title, text, background) {
          Notification_Count += 1;
          var x = document.getElementById("Notification_1");

          function ChangeBackgroundColors() {
            if (background) {
              x.style.borderLeft = `75px solid ${background}`;
            } else {
              x.style.borderLeft = `75px solid #1085a8`;
            }
          }
          if (Notification_Count > 1) {
            setTimeout(function () {
              Default_Time + 9000;
              ChangeBackgroundColors();
              x.innerHTML = `<id class="checkicon"><b>${title}</b> <i class="${icon}"></i> </id><p>${text}</p>`;
              x.className = "show";
              setTimeout(function () {
                x.className = x.className.replace("show", "");
              }, 3000);
            }, Default_Time);
          } else {
            ChangeBackgroundColors();

            x.innerHTML = `<id class="checkicon"><b>${title}</b> <i class="${icon}"></i> </id><p>${text}</p>`;
            x.className = "show";
            setTimeout(function () {
              x.className = x.className.replace("show", "");
            }, 3000);
          }
        }
        /// Add Items To Playlist

        var VideoGenres, VideoSources, VideoTitles, AlbumCovers;

        VideoSources = [];

        VideoTitles = [];

        VideoGenres = [];

        AlbumCovers = [];

        function addItemsToPlaylist(src, title, genre, albumCoverArt) {
          VideoSources.push(src);
          VideoTitles.push(title);
          VideoGenres.push(genre);
          if (albumCoverArt) {
            AlbumCovers.push(albumCoverArt);
          }
        }

        if (VideoSources.length > 0) {
          i = i + 1; // increase i by one
          i = i % VideoSources.length; // if we've gone too high, start from `0` again
          if (i === 0) {
            alert("done");
          }
        }
