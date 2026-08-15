# Video Background Instructions

## Adding Your Hero Video

To add your beauty parlour video as the hero background:

1. **Place your video file in this `public` folder** with one of these names:
   - `hero-video.mp4` (recommended - most compatible)
   - `hero-video.webm` (alternative format)

2. **Video Requirements:**
   - **Format**: MP4 or WebM
   - **Resolution**: 1920x1080 or higher recommended
   - **Duration**: 10-30 seconds (will loop automatically)
   - **Size**: Under 10MB for good loading performance
   - **Aspect Ratio**: 16:9 landscape works best

3. **Watermark Handling:**
   - The video is automatically cropped by 20-50% on the sides
   - This removes most watermarks positioned on edges
   - On mobile, cropping increases to 30-50% for better coverage

4. **Video Features:**
   - ✅ Infinite loop
   - ✅ Auto-play (muted)
   - ✅ No sound
   - ✅ Mobile optimized
   - ✅ Fallback image if video fails to load

## Current Status
- Video path: `/hero-video.mp4`
- Fallback image: Stock beauty image (will show if video not found)

## Testing
After adding your video:
1. Refresh the website
2. Check that video plays automatically
3. Test on mobile devices
4. Verify watermarks are cropped out

## Optimization Tips
- Compress your video to reduce file size
- Use H.264 codec for MP4 files
- Remove audio track to reduce file size
- Consider using online video compressors like HandBrake or online tools