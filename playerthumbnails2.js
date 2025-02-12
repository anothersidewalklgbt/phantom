function fetch_player_thumbnails(e, t, a) {
    var r = "userIds=" + e.filter( (t, a) => e.indexOf(t) === a).sort(function(t, a) {
        return t - a
    }).slice(0, 99);
    let s;
    switch (t) {
    case "avatar":
        s = "avatar";
        break;
    case "avatarbust":
        s = "avatarbust";
        break;
    default:
        return
    }
    t = `https://thumbnails.rolimons.com/${s}?${r}&size=` + (a ? "420x420" : "150x150");
    return $.getJSON(t, {}).fail(function() {
        console.warn("Player thumbnail fetch failed")
    })
}
function update_dom_thumbnail_elements(t, e) {
    let r = t.thumbnails
      , s = !1;
    $(`[${e}]`).each(function() {
        var t, a = $(this).attr(e).toString();
        a in r && "Completed" === r[a].state && "string" == typeof r[a].url && r[a].url.startsWith("https://tr.rbxcdn.com/") && ($(this).removeAttr(e),
        void 0 !== (t = $(this).attr("data-add-lazyload")) && !1 !== t ? ($(this).attr("data-src", r[a].url),
        $(this).addClass("lazyload"),
        s = !0) : $(this).attr("src", r[a].url))
    }),
    s && lazyload()
}
function update_player_thumbnails() {
    let t = []
      , a = []
      , e = []
      , r = [];
    $("[data-fetch-player-avatar-sm]").each(function() {
        t.push($(this).attr("data-fetch-player-avatar-sm"))
    }),
    $("[data-fetch-player-avatar-bust-sm]").each(function() {
        a.push($(this).attr("data-fetch-player-avatar-bust-sm"))
    }),
    $("[data-fetch-player-avatar-lg]").each(function() {
        e.push($(this).attr("data-fetch-player-avatar-lg"))
    }),
    $("[data-fetch-player-avatar-bust-lg]").each(function() {
        r.push($(this).attr("data-fetch-player-avatar-bust-lg"))
    }),
    0 < t.length && $.when(fetch_player_thumbnails(t, "avatar", !1)).done(function(t) {
        !0 === t.success && Object.prototype.hasOwnProperty.call(t, "thumbnails") && update_dom_thumbnail_elements(t, "data-fetch-player-avatar-sm")
    }),
    0 < a.length && $.when(fetch_player_thumbnails(a, "avatarbust", !1)).done(function(t) {
        !0 === t.success && Object.prototype.hasOwnProperty.call(t, "thumbnails") && update_dom_thumbnail_elements(t, "data-fetch-player-avatar-bust-sm")
    }),
    0 < e.length && $.when(fetch_player_thumbnails(e, "avatar", !0)).done(function(t) {
        !0 === t.success && Object.prototype.hasOwnProperty.call(t, "thumbnails") && update_dom_thumbnail_elements(t, "data-fetch-player-avatar-lg")
    }),
    0 < r.length && $.when(fetch_player_thumbnails(r, "avatarbust", !0)).done(function(t) {
        !0 === t.success && Object.prototype.hasOwnProperty.call(t, "thumbnails") && update_dom_thumbnail_elements(t, "data-fetch-player-avatar-bust-lg")
    })
}
