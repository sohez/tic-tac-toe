let x = "x", o = "o"; //two Variable X and o
let player = 0; // 0==x and 1==O
var box = []; //array store a values
set_empty();//set all ary element empty
//set wining position in a array
let clicks = 0; //count a clicks
var userx = usero = 0; // X and O win Points
let draw = 0; //count a draw matchs
var play_with = "p2" //check if play with bot ot 2 players
check_play_with();
who_play_set_color();//check and set color for witch player play
var arri = [];

function set_player(id_player) {
    if (id_player != play_with) {
        play_with = id_player;
        check_play_with();
        userx = usero = 0;
        draw = 0;
        $('#ux').text(userx);
        $('#uo').text(usero);
        $('#draw').text(draw);
        reset_game();
    }
}

function boxclick(get_box_id) {
    var res = get_box_id.charAt(get_box_id.length - 1);//store box id int
    res--;
    box[res] == "" ? set_values(res, "#" + get_box_id) : $("#info").text("Select Other BOX !");
}

function logic() {

    var box_array = [
        [box[0], box[1], box[2]],
        [box[0], box[3], box[6]],
        [box[3], box[4], box[5]],
        [box[6], box[7], box[8]],
        [box[1], box[4], box[7]],
        [box[2], box[5], box[8]],
        [box[0], box[4], box[8]],
        [box[2], box[4], box[6]]
    ];

    for (i = 0; i < box_array.length; i++) {

        if (box_array[i][0] == x && box_array[i][1] == x && box_array[i][2] == x) {

            game_win(x);
            win_change_opacity(i);

        }
        if (box_array[i][0] == o && box_array[i][1] == o && box_array[i][2] == o) {

            game_win(o);
            win_change_opacity(i);
        }
    }

    if (clicks == 9) {
        game_draw();
    }

}

function game_win(winer) {

    if (winer == x) {
        userx++;
        $('#ux').text(userx);
    } else {
        usero++;
        $('#uo').text(usero);
    }
    setTimeout(reset_game, 1000);
}

function game_draw() {

    draw++;
    $('#draw').text(draw);
    win_change_opacity("");
    setTimeout(reset_game, 1000);
}

function set_values(box_ary, box_id) {
    //store a values in array and other logic
    $("#info").text("");

    if (player == 0) {
        box[box_ary] = x;
        player++;
        $(box_id).text('X');
        clicks++;
        logic();

    } else {
        box[box_ary] = o;
        player--;
        $(box_id).text('O');
        $(box_id).css("color", "blue");
        clicks++;
        logic();
    }

    if (play_with == "bot") {
        bot();
    }
   
    who_play_set_color();

}

function reset_game() {
    set_empty(); //set array empty
    clicks = 0;//set click == 0

    if (play_with == "bot") {
        //che3ck if select on box
        player = 0;
        who_play_set_color();
    }

    for (i = 1; i <= 9; i++) {
        $("#box" + i).text('');
        $("#box" + i).css("color", "red");
        $("#box" + i).css("opacity", "1");
    }
}

function who_play_set_color() {
    //set a color for witch player play
    if (player == 0) {
        $('#x').css("color", "red");
        $('#o').css("color", "black");
        $(':root').css("--rot", "red")
    } else {
        $('#o').css("color", "blue");
        $('#x').css("color", "black");
        $(':root').css("--rot", "blue");
    }
}

function set_empty() {

    for (i = 0; i <= 9; i++) {
        //set all array empty
        box[i] = "";
    }
}

function set_lock() {

    for (i = 0; i <= 9; i++) {
        //set all array empty
        box[i] = "locked";
    }
}
function check_play_with() {
    if (play_with == "p2") {
        $("#p2").css("text-decoration", "underline");
        $("#bot").css("text-decoration", "none")
    } else {
        $("#bot").css("text-decoration", "underline");
        $("#p2").css("text-decoration", "none")
    }
}
function win_change_opacity(i) {
    set_lock();

    $("#box1").css("opacity", "0.7");
    $("#box2").css("opacity", "0.7");
    $("#box3").css("opacity", "0.7");
    $("#box4").css("opacity", "0.7");
    $("#box5").css("opacity", "0.7");
    $("#box6").css("opacity", "0.7");
    $("#box7").css("opacity", "0.7");
    $("#box8").css("opacity", "0.7");
    $("#box9").css("opacity", "0.7");

    switch (i) {
        case 0:
            $("#box1").css("opacity", "1");
            $("#box2").css("opacity", "1");
            $("#box3").css("opacity", "1");
            break;
        case 1:
            $("#box1").css("opacity", "1");
            $("#box4").css("opacity", "1");
            $("#box7").css("opacity", "1");
            break;
        case 2:
            $("#box4").css("opacity", "1");
            $("#box5").css("opacity", "1");
            $("#box6").css("opacity", "1");
            break;
        case 3:
            $("#box7").css("opacity", "1");
            $("#box8").css("opacity", "1");
            $("#box9").css("opacity", "1");
            break;
        case 4:
            $("#box2").css("opacity", "1");
            $("#box5").css("opacity", "1");
            $("#box8").css("opacity", "1");
            break;
        case 5:
            $("#box3").css("opacity", "1");
            $("#box6").css("opacity", "1");
            $("#box9").css("opacity", "1");
            break;
        case 6:
            $("#box1").css("opacity", "1");
            $("#box5").css("opacity", "1");
            $("#box9").css("opacity", "1");
            break;
        case 7:
            $("#box3").css("opacity", "1");
            $("#box5").css("opacity", "1");
            $("#box7").css("opacity", "1");
            break;
    }
    //jite hue ki Opacity karm hai karni
}
function bot() {
    if (player == 1) {

        setTimeout(() => {

        if (box[0] == o || box[1] == o || box[2] == o) {

            if (box[0] == "") {
                box[0] = o;
                clicks++;
                player--;
                logic();
                $("#box1").text('O');
                $("#box1").css("color", "blue");
                return;
            } else if (box[1] == "") {
                box[1] = o;
                clicks++;
                player--;
                logic();
                $("#box2").text('O');
                $("#box2").css("color", "blue");
                return;
            } else if (box[2] == "") {
                box[2] = o;
                clicks++;
                player--;
                logic();
                $("#box3").text('O');
                $("#box3").css("color", "blue");
                return;
            }

        }
        if (box[0] == o || box[3] == o || box[6] == o) {

            if (box[0] == "") {
                box[0] = o;
                clicks++;
                player--;
                logic();
                $("#box1").text('O');
                $("#box1").css("color", "blue");
                return;
            } else if (box[3] == "") {
                box[3] = o;
                clicks++;
                player--;
                logic();
                $("#box4").text('O');
                $("#box4").css("color", "blue");
                return;
            } else if (box[6] == "") {
                box[6] = o;
                clicks++;
                player--;
                logic();
                $("#box7").text('O');
                $("#box7").css("color", "blue");
                return;
            }

        }
        if (box[3] == o || box[4] == o || box[5] == o) {

            if (box[3] == "") {
                box[3] = o;
                clicks++;
                player--;
                logic();
                $("#box4").text('O');
                $("#box4").css("color", "blue");
                return;
            } else if (box[4] == "") {
                box[4] = o;
                clicks++;
                player--;
                logic();
                $("#box5").text('O');
                $("#box5").css("color", "blue");
                return;
            } else if (box[5] == "") {
                box[5] = o;
                clicks++;
                player--;
                logic();
                $("#box6").text('O');
                $("#box6").css("color", "blue");
                return;
            }

        }
        if (box[6] == o || box[7] == o || box[8] == o) {

            if (box[6] == "") {
                box[6] = o;
                clicks++;
                player--;
                logic();
                $("#box7").text('O');
                $("#box7").css("color", "blue");
                return;
            } else if (box[7] == "") {
                box[7] = o;
                clicks++;
                player--;
                logic();
                $("#box8").text('O');
                $("#box8").css("color", "blue");
                return;
            } else if (box[8] == "") {
                box[8] = o;
                clicks++;
                player--;
                logic();
                $("#box9").text('O');
                $("#box9").css("color", "blue");
                return;
            }

        }
        if (box[1] == o || box[4] == o || box[7] == o) {

            if (box[1] == "") {
                box[1] = o;
                clicks++;
                player--;
                logic();
                $("#box2").text('O');
                $("#box2").css("color", "blue");
                return;
            } else if (box[4] == "") {
                box[4] = o;
                clicks++;
                player--;
                logic();
                $("#box5").text('O');
                $("#box5").css("color", "blue");
                return;
            } else if (box[7] == "") {
                box[7] = o;
                clicks++;
                player--;
                logic();
                $("#box8").text('O');
                $("#box8").css("color", "blue");
                return;
            }

        }
        if (box[2] == o || box[5] == o || box[8] == o) {

            if (box[2] == "") {
                box[2] = o;
                clicks++;
                player--;
                logic();
                $("#box3").text('O');
                $("#box3").css("color", "blue");
                return;
            } else if (box[5] == "") {
                box[5] = o;
                clicks++;
                player--;
                logic();
                $("#box6").text('O');
                $("#box6").css("color", "blue");
                return;
            } else if (box[8] == "") {
                box[8] = o;
                clicks++;
                player--;
                logic();
                $("#box9").text('O');
                $("#box9").css("color", "blue");
                return
            }

        }
        if (box[0] == o || box[4] == o || box[8] == o) {

            if (box[0] == "") {
                box[0] = o;
                clicks++;
                player--;
                logic();
                $("#box1").text('O');
                $("#box1").css("color", "blue");
                return;
            } else if (box[4] == "") {
                box[4] = o;
                clicks++;
                player--;
                logic();
                $("#box5").text('O');
                $("#box5").css("color", "blue");
                return;
            } else if (box[8] == "") {
                box[8] = o;
                clicks++;
                player--;
                logic();
                $("#box9").text('O');
                $("#box9").css("color", "blue");
                return;
            }

        }
        if (box[2] == o || box[4] == o || box[6] == o) {

            if (box[2] == "") {
                box[2] = o;
                clicks++;
                player--;
                logic();
                $("#box3").text('O');
                $("#box3").css("color", "blue");
                return;
            } else if (box[4] == "") {
                box[4] = o;
                clicks++;
                player--;
                logic();
                $("#box5").text('O');
                $("#box5").css("color", "blue");
                return;
            } else if (box[6] == "") {
                box[6] = o;
                clicks++;
                player--;
                logic();
                $("#box7").text('O');
                $("#box7").css("color", "blue");
                return;
            }
        }

        if (box[0] == "") {
            box[0] = o;
            clicks++;
            player--;
            logic();
            $("#box1").text('O');
            $("#box1").css("color", "blue");
            return;
        } else if (box[1] == "") {
            box[1] = o;
            clicks++;
            player--;
            logic();
            $("#box2").text('O');
            $("#box2").css("color", "blue");
            return;
        } else if (box[2] == "") {
            box[2] = o;
            clicks++;
            player--;
            logic();
            $("#box3").text('O');
            $("#box3").css("color", "blue");
            return;
        } else if (box[3] == "") {
            box[3] = o;
            clicks++;
            player--;
            logic();
            $("#box4").text('O');
            $("#box4").css("color", "blue");
            return;
        } else if (box[4] == "") {
            box[4] = o;
            clicks++;
            player--;
            logic();
            $("#box5").text('O');
            $("#box5").css("color", "blue");
            return;
        } else if (box[5] == "") {
            box[5] = o;
            clicks++;
            player--;
            logic();
            $("#box6").text('O');
            $("#box6").css("color", "blue");
            return;
        } else if (box[6] == "") {
            box[6] = o;
            clicks++;
            player--;
            logic();
            $("#box7").text('O');
            $("#box7").css("color", "blue");
            return;
        } else if (box[7] == "") {
            box[7] = o;
            clicks++;
            player--;
            logic();
            $("#box8").text('O');
            $("#box8").css("color", "blue");
            return;
        } else if (box[8] == "") {
            box[8] = o;
            clicks++;
            player--;
            logic();
            $("#box9").text('O');
            $("#box9").css("color", "blue");
            return;
        }

        }, 100);

    }
}
