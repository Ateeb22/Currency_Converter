import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  template: `
    <header class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-icon-wrap">
          <mat-icon class="hero-icon">currency_exchange</mat-icon>
        </div>
        <h1 class="hero-title">Currency Converter</h1>
        <p class="hero-sub">Real-time &nbsp;&bull;&nbsp; Historical Exchange Rates</p>
      </div>
    </header>
  `,
  styles: `
    .hero {
      position: relative;
      overflow: hidden;
      padding: 52px 24px 48px;
      text-align: center;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0e7490 100%);
      z-index: 0;
    }
    .hero-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 70% 20%, rgba(6,182,212,0.15) 0%, transparent 50%),
                  radial-gradient(circle at 30% 80%, rgba(99,102,241,0.1) 0%, transparent 50%);
    }
    .hero-content {
      position: relative;
      z-index: 1;
    }
    .hero-icon-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.15);
      margin-bottom: 20px;
    }
    .hero-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #67e8f9;
    }
    .hero-title {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.5px;
    }
    .hero-sub {
      margin: 12px 0 0;
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    @media (max-width: 480px) {
      .hero {
        padding: 40px 16px 44px;
      }
      .hero-title {
        font-size: 22px;
      }
      .hero-sub {
        font-size: 11px;
        letter-spacing: 1.5px;
        margin-top: 10px;
      }
    }
  `,
})
export class HeaderComponent {}
