import os
import subprocess

def create_cinematic_clip(image_path, output_path, zoom_expr, duration=4, fps=30):
    """
    Creates a 1920x1080 cinematic camera motion clip from a high-res photo using ffmpeg zoompan.
    """
    total_frames = duration * fps
    # zoompan filter: creates smooth subpixel camera motion
    filter_complex = (
        f"scale=2560:-1,"
        f"zoompan=z='{zoom_expr}':d={total_frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps={fps},"
        f"eq=contrast=1.08:brightness=-0.02:saturation=1.12,"
        f"vignette=PI/4.5"
    )
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", image_path,
        "-vf", filter_complex,
        "-t", str(duration),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "20",
        output_path
    ]
    subprocess.run(cmd, check=True)

def main():
    os.makedirs("public/videos", exist_ok=True)
    os.makedirs("temp_clips", exist_ok=True)

    shots = [
        # Shot 1: Truffle dish macro push
        ("src/assets/images/dish_truffle_gastronomy_1792754320242.jpg", "temp_clips/shot1.mp4", "min(zoom+0.0012,1.20)"),
        # Shot 2: Chef plating
        ("src/assets/images/chef_culinary_portrait_1792754319896.jpg", "temp_clips/shot2.mp4", "min(zoom+0.0010,1.15)"),
        # Shot 3: Grand Salon Impérial
        ("src/assets/images/hero_culinary_restaurant_1792754318347.jpg", "temp_clips/shot3.mp4", "min(zoom+0.0013,1.22)"),
        # Shot 4: Marrakech garden terrace
        ("src/assets/images/restaurant_terrace_morocco_1792754319947.jpg", "temp_clips/shot4.mp4", "min(zoom+0.0011,1.18)"),
        # Shot 5: Haute Couture chocolate
        ("src/assets/images/patisserie_haute_couture_1792754336647.jpg", "temp_clips/shot5.mp4", "min(zoom+0.0012,1.20)")
    ]

    print("Generating individual cinematic camera shots...")
    for img, out_clip, zoom in shots:
        print(f"Rendering {out_clip}...")
        create_cinematic_clip(img, out_clip, zoom, duration=4)

    # Concat with xfade cross-dissolves
    print("Compositing 5 shots with smooth cinematic crossfades...")
    # Using ffmpeg xfade: 4s clips, 0.8s crossfade
    # Timeline:
    # shot1: 0 - 4
    # shot2: offset 3.2
    # shot3: offset 6.4
    # shot4: offset 9.6
    # shot5: offset 12.8
    # Total duration = 16 seconds
    xfade_cmd = [
        "ffmpeg", "-y",
        "-i", "temp_clips/shot1.mp4",
        "-i", "temp_clips/shot2.mp4",
        "-i", "temp_clips/shot3.mp4",
        "-i", "temp_clips/shot4.mp4",
        "-i", "temp_clips/shot5.mp4",
        "-filter_complex",
        (
            "[0:v][1:v]xfade=transition=fade:duration=0.8:offset=3.2[v01];"
            "[v01][2:v]xfade=transition=fade:duration=0.8:offset=6.4[v02];"
            "[v02][3:v]xfade=transition=fade:duration=0.8:offset=9.6[v03];"
            "[v03][4:v]xfade=transition=fade:duration=0.8:offset=12.8[outv]"
        ),
        "-map", "[outv]",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "high",
        "-level", "4.1",
        "-movflags", "+faststart",
        "-crf", "21",
        "public/videos/hero.mp4"
    ]
    subprocess.run(xfade_cmd, check=True)
    print("hero.mp4 successfully created in public/videos/hero.mp4!")

if __name__ == "__main__":
    main()
