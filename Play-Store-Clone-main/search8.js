var mixitup;
let global_player_search_mixer, global_item_search_mixer, global_game_search_mixer, global_group_search_mixer, GLOBAL_SEARCH_TYPE_ITEMS = 1, GLOBAL_SEARCH_TYPE_GAMES = 3, global_search_item_details = null, global_search_display_items_array = [], global_search_all_items_array = [], global_search_game_details = null, global_search_display_games_array = [], global_search_all_games_array = [], global_search_group_details_fetched = !1, global_search_player_list_api_response = {}, global_search_groups_list_api_response = {}, global_search_input_delay = 400, global_item_search_display_count = 15, global_player_search_display_count = 15, global_game_search_display_count = 15, global_group_search_display_count = 15, global_item_search_string = "", global_player_search_string = "", global_game_search_string = "", global_group_search_string = "", previous_global_player_search_string = "", previous_global_group_search_string = "", global_search_string_length_min = 3, global_search_string_length_max = 20, global_group_search_string_length_min = 1, global_group_search_string_length_max = 20;
function recalculate_global_search_display_counts() {
    let a, e, _, l;
    l = 850 <= window.innerWidth ? (a = 15,
    e = 15,
    _ = 15) : 680 <= window.innerWidth ? (a = 12,
    e = 12,
    _ = 12) : 550 <= window.innerWidth ? (a = 12,
    e = 12,
    _ = 12) : 430 <= window.innerWidth ? (a = 12,
    e = 12,
    _ = 12) : (window.innerWidth,
    a = 12,
    e = 12,
    _ = 12),
    global_item_search_display_count != a && (global_item_search_display_count = a,
    global_item_search_filter_control_handler()),
    global_player_search_display_count != e && (global_player_search_display_count = e,
    do_global_player_search_mixer()),
    global_game_search_display_count != _ && (global_game_search_display_count = _,
    do_global_game_search_mixer()),
    global_group_search_display_count != l && (global_group_search_display_count = l,
    do_global_group_search_mixer())
}
function show_global_search_modal() {
    $("#search_modal").modal("show"),
    global_search_item_details || global_item_search_details_fetch(),
    document.getElementById("global_item_search_textbox").focus()
}
function do_global_player_search_mixer() {
    if (Object.prototype.hasOwnProperty.call(global_search_player_list_api_response, "players")) {
        var e = []
          , _ = global_search_player_list_api_response.players;
        for (let a = 0; a < _.length; ++a)
            e.push({
                player_id: _[a][0],
                player_name: _[a][1]
            });
        global_player_search_mixer.dataset(e.slice(0, global_player_search_display_count)),
        update_player_thumbnails()
    }
}
function handle_global_player_search_string_change() {
    global_search_delay(global_search_fetch_search_result)
}
function global_search_fetch_search_result() {
    global_player_search_string.length < global_search_string_length_min || global_player_search_string.length > global_search_string_length_max ? "" != previous_global_player_search_string && (previous_global_player_search_string = "",
    global_search_player_list_api_response = {
        success: !0,
        result_count: 0,
        players: []
    },
    do_global_player_search_mixer()) : global_search_is_search_string_content_valid(global_player_search_string) && (global_player_search_string != previous_global_player_search_string && $.getJSON("https://api.rolimons.com/players/v1/playersearch", {
        searchstring: global_player_search_string
    }, function(a) {
        global_search_player_list_api_response = a,
        do_global_player_search_mixer()
    }),
    previous_global_player_search_string = global_player_search_string)
}
window.onresize = recalculate_global_search_display_counts,
document.addEventListener("DOMContentLoaded", function(a) {
    $("#global_item_search_textbox").val(global_item_search_string),
    $("#global_player_search_textbox").val(global_player_search_string),
    $("#global_game_search_textbox").val(global_game_search_string),
    $("#global_group_search_textbox").val(global_group_search_string),
    global_item_search_mixer = mixitup(document.querySelector('[data-ref="global_item_search_mix_container"]'), {
        selectors: {
            target: '[data-ref="item"]'
        },
        layout: {
            siblingAfter: document.querySelector('[data-ref="first-gap-global-item-search"]')
        },
        data: {
            uidKey: "id"
        },
        animation: {
            enable: !1,
            duration: 250
        },
        render: {
            target: function(a) {
                var e = a.projected ? '<div class="global_item_search_system_item_tag_icon global_item_search_projected_tag_icon" data-toggle="tooltip" title="Projected"></div>' : "";
                return '<div class="shadow_md_35 shift_up_md pb-2 mb-3 global_item_search_mix_item" data-ref="item" style="background-color: #30363c;">' + `<a href="${a.url}">` + `<div><h6 class="global_item_search_title px-2 text-light my-1 text-truncate" title="${a.name}">${a.name}</h6></div>` + '<div class="position-relative std_item_card_img_bkgnd_gradient text-center px-2">' + `<div class="global_item_search_system_item_tag_container">${a.rare ? '<div class="global_item_search_system_item_tag_icon global_item_search_rare_tag_icon" data-toggle="tooltip" title="Rare"></div>' : ""}${a.hyped ? '<div class="global_item_search_system_item_tag_icon global_item_search_hyped_tag_icon" data-toggle="tooltip" title="Hyped"></div>' : ""}${e}</div>` + `<img class="global_item_search_image" src="${a.thumbnail_sm}" height="100" width="100" alt="Item Thumbnail">` + '</div><div class="px-2 pt-1"><div class="d-flex justify-content-between"><div class="global_item_search_stat_header text-muted">RAP</div>' + `<div class="global_item_search_stat_data text-light text-truncate">${a.display_rap}</div>` + '</div><div class="d-flex justify-content-between"><div class="global_item_search_stat_header text-muted">Value</div>' + `<div class="global_item_search_stat_data text-light text-truncate">${a.display_value}</div>` + "</div></div></a></div>"
            }
        }
    }),
    global_player_search_mixer = mixitup(document.querySelector('[data-ref="global_player_search_mix_container"]'), {
        selectors: {
            target: '[data-ref="player"]'
        },
        layout: {
            siblingAfter: document.querySelector('[data-ref="first-gap-global-player-search"]')
        },
        data: {
            uidKey: "player_id"
        },
        animation: {
            enable: !1,
            duration: 250
        },
        render: {
            target: function(a) {
                return '<div class="mb-3 shadow_md_35 shift_up_md global_player_search_mix_item" data-ref="player" style="background-color: #30363c;">' + `<a href="/player/${a.player_id}">` + `<div><h6 class="px-2 global_item_search_title text-light my-1 text-truncate" title="${a.player_name}">${a.player_name}</h6></div>` + '<div class="std_item_card_img_bkgnd_gradient text-center border-top border-dark py-4">' + `<img class="global_player_search_image d-block-inline" src="/images/transparent-square-110.png" data-fetch-player-avatar-sm="${a.player_id}" data-add-lazyload height="150" width="150" alt="Player Thumbnail">` + "</div></a></div>"
            }
        }
    }),
    global_game_search_mixer = mixitup(document.querySelector('[data-ref="global_game_search_mix_container"]'), {
        selectors: {
            target: '[data-ref="item"]'
        },
        layout: {
            siblingAfter: document.querySelector('[data-ref="first-gap-global-game-search"]')
        },
        data: {
            uidKey: "id"
        },
        animation: {
            enable: !1,
            duration: 250
        },
        render: {
            target: function(a) {
                return '<div class="shadow_md_35 shift_up_md pb-1 mb-3 global_game_search_mix_item" data-ref="item" style="background-color: #30363c;">' + `<a href="${a.url}">` + `<div><h6 class="global_game_search_title px-2 text-light my-1 text-truncate" title="${a.name}">${a.name}</h6></div>` + '<div class="std_item_card_img_bkgnd_gradient text-center">' + `<img class="global_game_search_image" src="${a.icon_url}" height="150" width="150" alt="Game Icon">` + '</div><div class="px-2 pt-1"><div class="d-flex justify-content-between"><div class="global_game_search_stat_header text-muted">Players</div>' + `<div class="global_game_search_stat_data text-light text-truncate">${global_search_number_to_string_with_commas(a.players)}</div>` + "</div></div></a></div>"
            }
        }
    }),
    global_group_search_mixer = mixitup(document.querySelector('[data-ref="global_group_search_mix_container"]'), {
        selectors: {
            target: '[data-ref="item"]'
        },
        layout: {
            siblingAfter: document.querySelector('[data-ref="first-gap-global-group-search"]')
        },
        data: {
            uidKey: "id"
        },
        animation: {
            enable: !1
        },
        render: {
            target: function(a) {
                return '<div class="shadow_md_35 shift_up_md pb-1 mb-3 global_group_search_mix_item" data-ref="item" style="background-color: #30363c;">' + `<a href="${a.url}">` + `<div><h6 class="global_group_search_title px-2 text-light my-1 text-truncate" title="${a.name}">${a.name}</h6></div>` + '<div class="std_item_card_img_bkgnd_gradient text-center">' + `<img class="global_group_search_image" src="${a.icon_url}" height="150" width="150" alt="Group Icon">` + '</div><div class="px-2 pt-1"><div class="d-flex justify-content-between"><div class="global_group_search_stat_header text-muted">Members</div>' + `<div class="global_group_search_stat_data text-light text-truncate">${global_search_number_to_string_with_commas(a.member_count)}</div>` + "</div></div></a></div>"
            }
        }
    }),
    recalculate_global_search_display_counts(),
    $("#global_player_search_textbox").on("keyup change", function() {
        global_player_search_string = $(this).val().trim(),
        handle_global_player_search_string_change()
    }),
    $("#global_player_search_textbox_clear").click(function() {
        $("#global_player_search_textbox").val(""),
        global_player_search_string = "",
        handle_global_player_search_string_change(),
        document.getElementById("global_player_search_textbox").focus()
    }),
    $('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
        a = $(a.target).attr("href");
        "#global_items_search_tab_pane" == a && document.getElementById("global_item_search_textbox").focus(),
        "#global_players_search_tab_pane" == a && (global_player_search_string = $("#global_player_search_textbox").val(),
        handle_global_player_search_string_change(),
        document.getElementById("global_player_search_textbox").focus()),
        "#global_games_search_tab_pane" == a && (global_search_game_details || global_game_search_details_fetch(),
        global_game_search_string = $("#global_game_search_textbox").val(),
        document.getElementById("global_game_search_textbox").focus()),
        "#global_groups_search_tab_pane" == a && (global_search_group_details_fetched || (global_group_search_details_fetch(!0),
        global_search_group_details_fetched = !0),
        global_group_search_string = $("#global_group_search_textbox").val(),
        document.getElementById("global_group_search_textbox").focus())
    }),
    $("#global_item_search_textbox").on("keyup change", function() {
        global_item_search_string = $(this).val().trim(),
        global_item_search_filter_control_handler()
    }),
    $("#global_item_search_textbox_clear").click(function() {
        $("#global_item_search_textbox").val(""),
        global_item_search_string = "",
        global_item_search_filter_control_handler(),
        $("#global_item_search_textbox").focus()
    }),
    $("#global_game_search_textbox").on("keyup change", function() {
        global_game_search_string = $(this).val().trim(),
        global_game_search_filter_control_handler()
    }),
    $("#global_game_search_textbox_clear").click(function() {
        $("#global_game_search_textbox").val(""),
        global_game_search_string = "",
        global_game_search_filter_control_handler(),
        $("#global_game_search_textbox").focus()
    }),
    $("#global_group_search_textbox").on("keyup change", function() {
        global_group_search_string = $(this).val().trim(),
        handle_global_group_search_string_change()
    }),
    $("#global_group_search_textbox_clear").click(function() {
        $("#global_group_search_textbox").val(""),
        global_group_search_string = "",
        handle_global_group_search_string_change(),
        $("#global_group_search_textbox").focus()
    })
});
let global_search_delay = globalSearchDelay(global_search_input_delay);
function globalSearchDelay(e) {
    let _ = 0;
    return function(a) {
        clearTimeout(_),
        _ = setTimeout(a, e)
    }
}
function global_search_is_search_string_content_valid(e) {
    for (let a = 0; a < e.length; ++a) {
        var _ = e.charCodeAt(a);
        if (!(47 < _ && _ < 58 || 64 < _ && _ < 91 || 96 < _ && _ < 123 || 32 == _ || 95 == _ || 40 == _ || 41 == _ || 91 == _ || 93 == _))
            return !1
    }
    return !0
}
function global_item_search_filter_control_handler() {
    var a, e = [];
    for (a in global_search_item_details)
        e.push(Number(a));
    var _, l, r, t = [];
    for (_ in e)
        -1 != global_search_item_details[e[_]][0].toLowerCase().indexOf(global_item_search_string.toLowerCase()) || null != global_search_item_details[e[_]][1] && -1 != global_search_item_details[e[_]][1].toLowerCase().indexOf(global_item_search_string.toLowerCase()) || t.push(e[_]);
    for (l in t)
        e.splice(e.indexOf(t[l]), 1);
    for (r in global_search_display_items_array = [],
    global_search_all_items_array)
        -1 < e.indexOf(global_search_all_items_array[r].id) && global_search_display_items_array.push(global_search_all_items_array[r]);
    global_search_display_items_array.sort(global_search_sorter("default_value", GLOBAL_SEARCH_TYPE_ITEMS)),
    console.log("-------------------------------------------------"),
    console.log(global_search_display_items_array),
    console.log("-------------------------------------------------"),
    do_global_item_search_mixer()
}
function do_global_item_search_mixer() {
    global_item_search_mixer.dataset(global_search_display_items_array.slice(0, global_item_search_display_count))
}
function global_item_search_details_fetch() {
    $.when($.getJSON("https://api.rolimons.com/items/v2/itemdetails"), $.getJSON("https://api.rolimons.com/itemthumbs/v1/thumbssm")).done(function(a, e) {
        global_search_item_details = a[0].items;
        var _, l = e[0].items;
        for (_ in global_search_all_items_array = [],
        global_search_item_details) {
            var r = global_search_item_details[_][2]
              , t = null == r ? "-" : global_search_number_to_string_with_commas(r)
              , s = 0 < global_search_item_details[_][3] ? global_search_item_details[_][3] : "-"
              , o = 0 < global_search_item_details[_][3] ? global_search_number_to_string_with_commas(global_search_item_details[_][3]) : "-";
            global_search_all_items_array.push({
                id: parseInt(_),
                name: global_search_item_details[_][0].trim(),
                acronym: global_search_item_details[_][1].trim(),
                url: "/item/" + _,
                rap: r,
                display_rap: t,
                value: s,
                display_value: o,
                default_value: global_search_item_details[_][3],
                projected: 1 == global_search_item_details[_][7],
                hyped: 1 == global_search_item_details[_][8],
                rare: 1 == global_search_item_details[_][9],
                thumbnail_sm: l[_]
            })
        }
        global_item_search_filter_control_handler()
    })
}
function global_game_search_filter_control_handler() {
    var a, e = [];
    for (a in global_search_game_details)
        e.push(Number(a));
    var _, l, r, t = [];
    for (_ in e)
        -1 == global_search_game_details[e[_]][0].toLowerCase().indexOf(global_game_search_string.toLowerCase()) && t.push(e[_]);
    for (l in t)
        e.splice(e.indexOf(t[l]), 1);
    for (r in global_search_display_games_array = [],
    global_search_all_games_array)
        -1 < e.indexOf(global_search_all_games_array[r].id) && global_search_display_games_array.push(global_search_all_games_array[r]);
    global_search_display_games_array.sort(global_search_sorter("players", GLOBAL_SEARCH_TYPE_GAMES)),
    do_global_game_search_mixer()
}
function do_global_game_search_mixer() {
    global_game_search_mixer.dataset(global_search_display_games_array.slice(0, global_game_search_display_count))
}
function global_game_search_details_fetch() {
    $.getJSON("https://api.rolimons.com/games/v1/gamelist", {}, function(a) {
        for (var e in global_search_game_details = a.games,
        global_search_all_games_array = [],
        global_search_game_details)
            global_search_all_games_array.push({
                id: parseInt(e),
                name: global_search_game_details[e][0].trim(),
                url: "/game/" + e,
                players: global_search_game_details[e][1],
                icon_url: global_search_game_details[e][2]
            });
        global_game_search_filter_control_handler()
    })
}
function do_global_group_search_mixer() {
    if (Object.prototype.hasOwnProperty.call(global_search_groups_list_api_response, "groups")) {
        var e = []
          , _ = global_search_groups_list_api_response.groups;
        for (let a = 0; a < _.length; ++a) {
            var l = _[a];
            e.push({
                id: l[0],
                name: l[1],
                member_count: l[5],
                url: "/group/" + l[0],
                icon_url: l[6]
            })
        }
        e.sort(function(a, e) {
            return e.member_count - a.member_count
        }),
        global_group_search_mixer.dataset(e.slice(0, global_group_search_display_count))
    }
}
function handle_global_group_search_string_change() {
    global_search_delay(global_group_search_details_fetch)
}
function global_group_search_details_fetch(a=!1) {
    let e = a ? !0 : !1;
    !e && (global_group_search_string.length < global_group_search_string_length_min || global_group_search_string.length > global_group_search_string_length_max) ? "" != previous_global_group_search_string && (previous_global_group_search_string = "",
    global_search_groups_list_api_response = {
        success: !0,
        result_count: 0,
        groups: []
    },
    do_global_group_search_mixer()) : ((e = global_group_search_string != previous_global_group_search_string ? !0 : e) && $.getJSON("https://api.rolimons.com/groups/v1/groupsearch", {
        searchstring: global_group_search_string
    }, function(a) {
        global_search_groups_list_api_response = a,
        do_global_group_search_mixer()
    }),
    previous_global_group_search_string = global_group_search_string)
}
var global_search_sorter = function(t, s) {
    return function(a, e) {
        var _ = global_item_search_string.toLowerCase();
        if (s === GLOBAL_SEARCH_TYPE_ITEMS) {
            var l = a.acronym && a.acronym.toLowerCase() === _
              , r = e.acronym && e.acronym.toLowerCase() === _;
            if (l && !r)
                return -1;
            if (!l && r)
                return 1;
            var l = a.name && a.name.toLowerCase() === _
              , r = e.name && e.name.toLowerCase() === _;
            if (l && !r)
                return -1;
            if (!l && r)
                return 1
        }
        return e[t] == a[t] ? a.id - e.id : ((_ = parseInt(a[t].toString().split(",").join(""))) < (l = parseInt(e[t].toString().split(",").join("")))) - (l < _)
    }
};
function global_search_number_to_string_with_commas(a) {
    return a < 1e3 ? null == a ? "-" : a.toString() : a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
