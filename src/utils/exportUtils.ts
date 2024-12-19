import type { ColorSwatch } from '../types';

export async function exportAsPNG(colors: ColorSwatch[]): Promise<void> {
  // ... existing PNG export code ...
}

export async function exportAsPDF(colors: ColorSwatch[]): Promise<void> {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) throw new Error('Could not create document');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page { 
            margin: 40px;
            size: A4;
          }
          body { 
            margin: 0;
            font-family: system-ui, -apple-system, sans-serif;
            color: #1a1a1a;
          }
          .container {
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            font-size: 28px;
            margin-bottom: 40px;
            text-align: center;
          }
          .palette {
            display: flex;
            gap: 20px;
            margin-bottom: 40px;
            min-height: 200px;
          }
          .color-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .color-block {
            width: 100%;
            height: 120px;
            min-height: 120px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: 1px solid rgba(0,0,0,0.1);
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .color-info {
            text-align: center;
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
            padding: 8px;
            background: #f5f5f5;
            border-radius: 4px;
          }
          .footer {
            margin-top: 60px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Color Palette</h1>
          
          <div class="palette">
            ${colors.map(color => `
              <div class="color-item">
                <div class="color-block" style="background-color: ${color.hex} !important"></div>
                <div class="color-info">${color.hex.toUpperCase()}</div>
              </div>
            `).join('')}
          </div>

          <div class="footer">
            Generated for free from Palette Pro
          </div>
        </div>
      </body>
    </html>
  `);
  doc.close();

  try {
    iframe.contentWindow?.print();
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  } finally {
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }
}

export async function exportAsTXT(colors: ColorSwatch[]): Promise<void> {
  // ... existing TXT export code ...
}