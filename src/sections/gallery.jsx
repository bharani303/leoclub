import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, LayoutGrid, Sparkles, Images, Camera, Film } from 'lucide-react';

/* ─── Cloudinary CDN ───────────────────────────────────────────────────── */
const CLD = "https://res.cloudinary.com/dli1wdywq";
// For videos, swap .mov/.mp4 → .jpg so Cloudinary returns a poster-frame image
const toJpg = (path) => path.replace(/\.(mov|mp4|webm|avi)$/i, '.jpg');
const thumb = (id) => `${CLD}/${id.split('/')[0]}/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/${toJpg(id.split('/').slice(1).join('/'))}`;
const full = (id) => `${CLD}/${id.split('/')[0]}/upload/w_1600,c_fill,g_auto,q_auto,f_auto/${toJpg(id.split('/').slice(1).join('/'))}`;
const tiny = (id) => `${CLD}/${id.split('/')[0]}/upload/w_120,h_80,c_fill,g_auto,q_60,f_auto/${toJpg(id.split('/').slice(1).join('/'))}`;
// Actual video stream URL (keeps .mov/.mp4 extension)
const videoUrl = (id) => `${CLD}/${id.split('/')[0]}/upload/q_auto/${id.split('/').slice(1).join('/')}`;

/* ─── 156 live assets — organized by event category ────────────────────── */
const galleryItems = [
    // ── Events (Camera shots + Aug 24 event) ── 82 items
    { id: "image/IMG_5087_dvzx1d.jpg", cat: "Events" },
    { id: "image/IMG_5142_mx24l2.jpg", cat: "Events" },
    { id: "image/IMG_5088_swva5w.jpg", cat: "Events" },
    { id: "image/.trashed-1764178520-IMG_6012_rwmqoy.jpg", cat: "Events" },
    { id: "image/.trashed-1764178521-IMG_6011_iuloxt.jpg", cat: "Events" },
    { id: "image/IMG_5985_wcabfp.jpg", cat: "Events" },
    { id: "image/.trashed-1764178490-IMG_5987_firhrb.jpg", cat: "Events" },
    { id: "image/.trashed-1764178488-IMG_5986_vpiftz.jpg", cat: "Events" },
    { id: "image/IMG_5982_hcn5lc.jpg", cat: "Events" },
    { id: "image/IMG_5948_bhqlbo.jpg", cat: "Events" },
    { id: "image/.trashed-1764178470-IMG_5950_utxhov.jpg", cat: "Events" },
    { id: "image/IMG_5873_km30j9.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0015_kf94mu.jpg", cat: "Events" },
    { id: "image/.trashed-1764178548-IMG-20250824-WA0014_pjsfhu.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0016_dfnqp2.jpg", cat: "Events" },
    { id: "image/.trashed-1764178550-IMG-20250824-WA0018_tzuob9.jpg", cat: "Events" },
    { id: "image/.trashed-1764178551-IMG-20250824-WA0017_su1orh.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0020_erapkw.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0024_wxt5nv.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0019_qxrc6o.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0022_sevbd8.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0026_aqihor.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0025_gsownc.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0027_xv03rx.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0031_fksvi0.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0030_jccwax.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0032_gegcz3.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0029_k1ddw5.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0034_n59pwm.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0035_syorvb.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0036_akr3ht.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0039_m4cixc.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0038_geokdc.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0037_jbyy4k.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0040_ngyeth.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0041_vsjy8z.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0042_n1prcy.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0043_addwq2.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0046_dxw47w.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0045_trcufi.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0044_l9kgq8.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0050_pxahzm.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0049_bniecm.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0053_ad2f7q.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0052_tmcklv.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0054_sdox5a.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0051_eznduz.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0057_qilyds.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0059_jiqzfg.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0062_boxkib.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0061_xown2k.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0064_ax8yo9.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0065_f6lrjp.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0067_thtszx.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0063_qqlfdp.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0066_pkjlob.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0068_xx8fl2.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0071_w5y1vb.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0070_wikzqn.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0069_cw7cnz.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0074_jvwx64.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0073_yqqxn7.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0072_mzygyn.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0077_on0avj.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0076_zfzqzx.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0075_mixmin.jpg", cat: "Events" },
    { id: "image/.trashed-1764178589-IMG-20250824-WA0078_ehcjcb.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0082_s964nv.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0081_dqdxpl.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0080_hcswhm.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0085_lux3ag.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0084_xsibly.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0087_lsz6cr.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0086_ociyba.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0099_tif5in.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0088_g8h2wo.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0098_t2zs9o.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0095_odgcw9.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0101_hrzifi.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0104_pgub1w.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0106_jk9iml.jpg", cat: "Events" },
    { id: "image/IMG-20250824-WA0105_xyjcwe.jpg", cat: "Events" },

    // ── Service (Aug 8 event) ── 6 items
    { id: "image/IMG-20250808-WA0003_yytmpt.jpg", cat: "Service" },
    { id: "image/IMG-20250808-WA0002_uthymz.jpg", cat: "Service" },
    { id: "image/IMG-20250808-WA0004_pctvfr.jpg", cat: "Service" },
    { id: "image/IMG-20250808-WA0007_gepn0j.jpg", cat: "Service" },
    { id: "image/IMG-20250808-WA0000_cniz2j.jpg", cat: "Service" },
    { id: "image/IMG-20250808-WA0115_d4l9xs.jpg", cat: "Service" },

    // ── Sports (Sept 24 event) ── 21 items
    { id: "image/IMG-20250924-WA0033_kp3uc4.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0034_f8usgg.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0035_ivssd1.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0047_bodqtq.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0055_jkmsmz.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0054_xklbc8.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0053_rkbmmm.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0057_zvtkdw.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0058_z3zz8j.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0060_kt6anr.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0062_vkbo1m.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0061_bcvnog.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0094_k6yqer.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0093_gsdt9e.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0092_hktkbk.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0097_tduaz9.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0096_yrtles.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0095_byf3lz.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0136_hzlwwu.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0138_h1jac5.jpg", cat: "Sports" },
    { id: "image/IMG-20250924-WA0137_oqe5ru.jpg", cat: "Sports" },

    // ── Moments (47 video thumbnails) ──
    { id: "video/.trashed-1764178505-IMG_5996.MOV_nrj7tm.mov", cat: "Moments" },
    { id: "video/.trashed-1764178537-video_20250823_173829_hjajhf.mp4", cat: "Moments" },
    { id: "video/.trashed-1764178512-IMG_6003.MOV_ynol4t.mov", cat: "Moments" },
    { id: "video/.trashed-1764178501-IMG_5995.MOV_ftdpuf.mov", cat: "Moments" },
    { id: "video/IMG_5997_b29cky.mov", cat: "Moments" },
    { id: "video/IMG_5990_wehoiq.mov", cat: "Moments" },
    { id: "video/IMG_5999_usoba3.mov", cat: "Moments" },
    { id: "video/IMG_5992_cji4hm.mov", cat: "Moments" },
    { id: "video/IMG_5993_fxq8ht.mov", cat: "Moments" },
    { id: "video/.trashed-1764178503-IMG_5994.MOV_esmyie.mov", cat: "Moments" },
    { id: "video/IMG_5880_df8frf.mov", cat: "Moments" },
    { id: "video/IMG_5989_nykux5.mov", cat: "Moments" },
    { id: "video/IMG_5877_dxzflb.mov", cat: "Moments" },
    { id: "video/.trashed-1764178432-IMG_5927.MOV_uvpxub.mov", cat: "Moments" },
    { id: "video/.trashed-1764178449-IMG_5931.MOV_cpxrky.mov", cat: "Moments" },
    { id: "video/.trashed-1764178452-IMG_5929.MOV_dti2bd.mov", cat: "Moments" },
    { id: "video/IMG_5879_t2nl23.mov", cat: "Moments" },
    { id: "video/.trashed-1764178479-IMG_5977.MOV_c8m85q.mov", cat: "Moments" },
    { id: "video/.trashed-1764178466-IMG_5935.MOV_le4gx4.mov", cat: "Moments" },
    { id: "video/IMG_5933_mqnlvl.mov", cat: "Moments" },
    { id: "video/IMG_5980_blchkf.mov", cat: "Moments" },
    { id: "video/.trashed-1764178450-IMG_5930.MOV_ianxb5.mov", cat: "Moments" },
    { id: "video/IMG_5881_iodigc.mov", cat: "Moments" },
    { id: "video/.trashed-1764178439-IMG_5932.MOV_hhr7lv.mov", cat: "Moments" },
    { id: "video/IMG_5953_gnnxqd.mov", cat: "Moments" },
    { id: "video/.trashed-1764178467-IMG_5938.MOV_ji6qa3.mov", cat: "Moments" },
    { id: "video/.trashed-1764178458-IMG_5937.MOV_zefkpz.mov", cat: "Moments" },
    { id: "video/IMG_5890_ydl4f2.mov", cat: "Moments" },
    { id: "video/IMG_5983_tk8pt3.mov", cat: "Moments" },
    { id: "video/IMG_5934_igqgj1.mov", cat: "Moments" },
    { id: "video/IMG_5976_d70kge.mov", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0023_lpm0rt.mp4", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0028_ywappc.mp4", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0033_jwfl1c.mp4", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0048_asbley.mp4", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0060_ros2ur.mp4", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0056_gyeerw.mp4", cat: "Moments" },
    { id: "video/IMG_5864_xffsio.mov", cat: "Moments" },
    { id: "video/IMG_5869_cykaku.mov", cat: "Moments" },
    { id: "video/IMG_5872_owpqpi.mov", cat: "Moments" },
    { id: "video/IMG_5867_ojnfgq.mov", cat: "Moments" },
    { id: "video/IMG_5871_mgceyy.mov", cat: "Moments" },
    { id: "video/IMG_5866_akmhrp.mov", cat: "Moments" },
    { id: "video/.trashed-1764178589-VID-20250824-WA0093_dgud32.mp4", cat: "Moments" },
    { id: "video/IMG_5865_sqww7q.mov", cat: "Moments" },
    { id: "video/IMG_5868_dyoz1x.mov", cat: "Moments" },
    { id: "video/IMG_5870_kqdi9m.mov", cat: "Moments" },
];

const CATS = ["All", "Events", "Sports", "Service", "Moments"];
const CAT_ICONS = { All: "🌟", Events: "🎉", Sports: "🏆", Service: "🤝", Moments: "🎬" };
const LOAD = 16;

/* ─── Lightbox ─────────────────────────────────────────────────────────── */
const Lightbox = memo(({ items, index, onClose }) => {
    const [cur, setCur] = useState(index);
    const [dir, setDir] = useState(0);
    const filmRef = useRef(null);
    const prev = useCallback(() => { setDir(-1); setCur(i => (i - 1 + items.length) % items.length); }, [items.length]);
    const next = useCallback(() => { setDir(1); setCur(i => (i + 1) % items.length); }, [items.length]);

    useEffect(() => {
        const h = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [prev, next, onClose]);

    useEffect(() => {
        filmRef.current?.children[cur]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [cur]);

    const item = items[cur];
    const isVid = item.id.startsWith('video/');
    const vars = {
        enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
    };

    return (
        <motion.div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/92 backdrop-blur-2xl" onClick={onClose} />

            {/* Close */}
            <button onClick={onClose}
                className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-sm">
                <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono backdrop-blur-sm">
                {String(cur + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </div>

            {/* Category badge */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-leo-gold/20 border border-leo-gold/30 text-leo-gold text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                {CAT_ICONS[item.cat]} {item.cat}
            </div>

            {/* Media: Video player or Image */}
            <div className="relative z-10 w-full max-w-5xl px-16 flex items-center justify-center">
                <AnimatePresence custom={dir} mode="wait">
                    <motion.div key={cur} custom={dir} variants={vars} initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="w-full flex items-center justify-center">
                        {isVid ? (
                            <video
                                key={item.id}
                                src={videoUrl(item.id)}
                                poster={full(item.id)}
                                controls
                                autoPlay
                                playsInline
                                className="w-full max-h-[72vh] rounded-2xl shadow-2xl bg-black"
                            />
                        ) : (
                            <img
                                src={full(item.id)}
                                alt={`${item.cat} photo ${cur + 1}`}
                                className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl select-none"
                                draggable={false}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Nav buttons */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all backdrop-blur-sm hover:scale-110">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all backdrop-blur-sm hover:scale-110">
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Filmstrip */}
            <div ref={filmRef} className="relative z-10 mt-5 flex gap-2 overflow-x-auto px-4 max-w-3xl" style={{ scrollbarWidth: 'none' }}>
                {items.map((item, i) => (
                    <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }}
                        className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200
              ${i === cur ? 'border-leo-gold scale-110 shadow-lg shadow-leo-gold/30' : 'border-white/20 opacity-40 hover:opacity-70'}`}>
                        <img src={tiny(item.id)} alt="" className="w-14 h-10 object-cover" loading="lazy" />
                    </button>
                ))}
            </div>
        </motion.div>
    );
});
Lightbox.displayName = 'Lightbox';

/* ─── Gallery Card ─────────────────────────────────────────────────────── */
const Card = memo(({ item, index, onClick }) => {
    const isVid = item.id.startsWith('video/');
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.35), ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={() => onClick(index)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-900 aspect-[4/3]"
        >
            <img src={thumb(item.id)} alt={`Leo Club ${item.cat}`} loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category pill */}
            <div className="absolute bottom-3 left-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="px-2.5 py-1 rounded-full bg-leo-gold text-leo-blue text-[11px] font-bold uppercase tracking-wider shadow">
                    {CAT_ICONS[item.cat]} {item.cat}
                </span>
            </div>

            {/* Video badge */}
            {isVid && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Film className="w-3 h-3" /> Video
                </div>
            )}

            {/* Expand icon */}
            <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/30 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                <Maximize2 className="w-4 h-4 text-white" />
            </div>

            {/* Gold hover ring */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-leo-gold/0 group-hover:ring-leo-gold/50 transition-all duration-300" />
        </motion.div>
    );
});
Card.displayName = 'Card';

/* ─── Gallery Section ──────────────────────────────────────────────────── */
const Gallery = () => {
    const [lbIdx, setLbIdx] = useState(null);
    const [activeCat, setActiveCat] = useState("All");
    const [count, setCount] = useState(LOAD);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const headerY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

    const filtered = useMemo(() =>
        activeCat === "All" ? galleryItems : galleryItems.filter(i => i.cat === activeCat),
        [activeCat]
    );
    const visible = useMemo(() => filtered.slice(0, count), [filtered, count]);

    const openLB = useCallback((i) => { setLbIdx(i); document.body.style.overflow = 'hidden'; }, []);
    const closeLB = useCallback(() => { setLbIdx(null); document.body.style.overflow = ''; }, []);
    useEffect(() => { setCount(LOAD); }, [activeCat]);

    const catCounts = useMemo(() => {
        const c = { All: galleryItems.length };
        galleryItems.forEach(i => { c[i.cat] = (c[i.cat] || 0) + 1; });
        return c;
    }, []);

    return (
        <>
            <AnimatePresence>
                {lbIdx !== null && <Lightbox items={filtered} index={lbIdx} onClose={closeLB} />}
            </AnimatePresence>

            <section ref={sectionRef} id="gallery" className="relative py-28 overflow-hidden bg-[#050710]">
                {/* Ambient blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-leo-blue/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-leo-gold/8 rounded-full blur-3xl pointer-events-none" />

                {/* Film grain */}
                <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* ── Header ── */}
                    <motion.div style={{ y: headerY }} className="text-center mb-14 w-full">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-leo-gold/10 border border-leo-gold/20 text-leo-gold text-xs font-bold uppercase tracking-[0.2em]">
                                <Sparkles className="w-3.5 h-3.5" /> Visual Stories
                            </div>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-none">
                                Our{' '}
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-leo-gold via-yellow-300 to-leo-gold bg-clip-text text-transparent">Gallery</span>
                                    <motion.span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-leo-gold to-transparent rounded-full"
                                        initial={{ scaleX: 0, transformOrigin: 'left' }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} />
                                </span>
                            </h2>
                            <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
                                {galleryItems.length} moments of service, sports & leadership — District 324 1D
                            </p>
                        </motion.div>

                        {/* Stats bar */}
                        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-5 mt-8 flex-wrap">
                            {CATS.filter(c => c !== 'All').map(c => (
                                <div key={c} className="text-center">
                                    <p className="text-xl font-bold text-white">{catCounts[c] || 0}</p>
                                    <p className="text-white/40 text-xs uppercase tracking-wider">{CAT_ICONS[c]} {c}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Category tabs ── */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="flex flex-wrap items-center justify-center gap-2 mb-12">
                        {CATS.map(cat => (
                            <button key={cat} onClick={() => setActiveCat(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border
                  ${activeCat === cat
                                        ? 'bg-leo-gold text-leo-blue border-leo-gold shadow-lg shadow-leo-gold/25'
                                        : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}>
                                {CAT_ICONS[cat]} {cat}
                                <span className={`ml-1.5 text-xs ${activeCat === cat ? 'text-leo-blue/60' : 'text-white/30'}`}>
                                    {catCounts[cat] || 0}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* ── Grid ── */}
                    <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <AnimatePresence mode="popLayout">
                            {visible.map((item, i) => (
                                <Card key={item.id} item={item} index={i} onClick={openLB} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* ── Load More ── */}
                    {count < filtered.length && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 text-center">
                            <button onClick={() => setCount(v => v + LOAD)}
                                className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-leo-gold/20 to-leo-gold/10 border border-leo-gold/30 text-leo-gold font-semibold text-sm hover:from-leo-gold/30 hover:to-leo-gold/20 transition-all duration-300 hover:shadow-lg hover:shadow-leo-gold/10">
                                <span className="flex items-center gap-2">
                                    <LayoutGrid className="w-4 h-4" />
                                    Load More ({filtered.length - count} remaining)
                                </span>
                            </button>
                        </motion.div>
                    )}

                    {/* Footer hint */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="mt-12 text-center w-full">
                        <p className="text-white/25 text-sm">
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-xs font-mono">←</kbd>{' '}
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-xs font-mono">→</kbd> navigate ·{' '}
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-xs font-mono">Esc</kbd> close
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Gallery;
