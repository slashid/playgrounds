export const mobileFallbackDirectIdEmailBody = `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <title>
        
        </title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        #outlook a { padding:0; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
        </style>
        <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
        .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        
        <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap" rel="stylesheet" type="text/css">
            <style type="text/css">
            @import url(https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    @import url(https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap);
            </style>
        <!--<![endif]-->

        
        
        <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
        </style>
        <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
        </style>
        
    
        <style type="text/css">
        
        
        </style>
        <style type="text/css">
        /* Support for dark mode */
    :root {
    color-scheme: light dark;
    supported-color-schemes: light dark;
    }

    /* Layout */
    .main {
    padding: 40px 40px 0px 40px;
    border-radius: 16px;
    border: 1px solid transparent;
    }
    .wrapper {
    padding: 120px 0px;
    }
    .footer {
    border-top: 1px solid transparent;
    }

    @media (max-width: 600px) {
    .main {
        border-radius: 0px;
        border: 0px solid transparent;
    }
    .wrapper {
        padding: 0px;
    }
    }

    /* Dark mode image swap */
    @media (prefers-color-scheme: dark) {
    .dark-img {
        display: block !important;
    }
    .light-img {
        display: none !important;
    }
    }

    [data-ogsc] .dark-img {
    display: block !important;
    }
    [data-ogsc] .light-img {
    display: none !important;
    }

    /* Background Asset */
    .bg-asset {
    background-image: url('https://cdn.sandbox.slashid.com/static/lock-light.png');
    background-repeat: no-repeat;
    background-position: bottom -69px right -137px;
    }

    @media (prefers-color-scheme: dark) {
    .bg-asset {
        background-image: url('https://cdn.sandbox.slashid.com/static/lock-dark.png');
        background-repeat: no-repeat;
        background-position: bottom -69px right -137px;
    }
    }

    @media (max-width: 600px) {
    .bg-asset {
        background-image: unset;
    }
    }

    /* Anchor default styling */
    a,
    a:link,
    a:visited,
    a:hover,
    a:active {
    color: inherit !important;
    }/** LIGHT THEME **/
    /* Text Colors */
    .text-color-placeholder,
    .text-color-placeholder div {
    color: rgba(20, 32, 73, 0.3) !important;
    }
    .text-color-foreground,
    .text-color-foreground div {
    color: rgba(20, 32, 73, 1) !important;
    }
    .text-color-contrast,
    .text-color-contrast div {
    color: rgba(20, 32, 73, 0.8) !important;
    }
    .text-color-secondary,
    .text-color-secondary div {
    color: rgba(20, 32, 73, 0.6) !important;
    }

    /* Background Colors */
    .bgcolor-background {
    background-color: rgba(243, 243, 245, 1) !important;
    }
    .bgcolor-panel {
    background-color: rgba(255, 255, 255, 1) !important;
    }

    /* Border Color */
    .border-subtle {
    border-color: rgba(20, 32, 73, 0.06) !important;
    }

    /** DARK THEME **/
    @media (prefers-color-scheme: dark) {
    /* Text Colors */
    .text-color-placeholder,
    .text-color-placeholder div {
        color: rgba(243, 243, 245, 0.3) !important;
    }
    .text-color-foreground,
    .text-color-foreground div {
        color: rgba(243, 243, 245, 1) !important;
    }
    .text-color-contrast,
    .text-color-contrast div {
        color: rgba(243, 243, 245, 0.8) !important;
    }
    .text-color-secondary,
    .text-color-secondary div {
        color: rgba(243, 243, 245, 0.6) !important;
    }

    /* Background Colors */
    .bgcolor-background {
        background-color: rgba(15, 14, 27, 1) !important;
    }
    .bgcolor-panel {
        background-color: rgba(34, 33, 49, 1) !important;
    }

    /* Border Color */
    .border-subtle {
        border-color: rgba(243, 243, 245, 0.06) !important;
    }
    }

    /** BUTTON **/
    .button-bgcolor a {
    background-color: rgba(42, 106, 255, 1) !important;
    }
    .button-text-color a {
    color: rgba(255, 255, 255, 1) !important;
    }
        </style>
        <!-- Dark mode metatags -->
    <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
    <!-- Font face -->
    <!-- CSS -->
    </head>
    <body style="word-spacing:normal;">
        
        
        <div
            class="bgcolor-background" style=""
        >
            
        
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="wrapper-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        
        
        <div  class="wrapper" style="margin:0px auto;max-width:600px;">
            
            <table
            align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
            >
            <tbody>
                <tr>
                <td
                    style="direction:ltr;font-size:0px;padding:0px;text-align:center;"
                >
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="main-outlook bgcolor-panel-outlook bg-asset-outlook border-subtle-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="main-outlook bgcolor-panel-outlook bg-asset-outlook border-subtle-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        
        
        <div  class="main bgcolor-panel bg-asset border-subtle" style="margin:0px auto;max-width:600px;">
            
            <table
            align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
            >
            <tbody>
                <tr>
                <td
                    style="direction:ltr;font-size:0px;padding:0px;text-align:center;"
                >
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                
        <div
            class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
        >
            
        <table
            border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
        >
            <tbody>
            <tr>
                <td  style="vertical-align:top;padding:0px;">
                
        <table
            border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
        >
            <tbody>
            <!-- Logo -->
                <tr>
                    <td
                    align="left" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word;"
                    >
                    
        <div
            style="font-family:Inter, -apple-system, blinkmacsystemfont, 'Segoe UI',
        roboto, oxygen, ubuntu, cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
        ><!-- Logo for light mode -->
    <div class="light-img">
        <img width="40" height="40" border="0" style="margin:0 auto; padding:0;" src="https://cdn.sandbox.slashid.com/static/logo-light.png" alt="slashid" />
    </div>

    <!-- Logo for dark mode -->
    <!--[if !mso]><!--><div class="dark-img" style="display:none; overflow:hidden;"><img width="40" height="40" border="0" style="margin:0 auto; padding:0;" src="https://cdn.sandbox.slashid.com/static/logo-dark.png" alt="slashid" /></div><!--<![endif]--></div>
        
                    </td>
                </tr>
                <!-- Content -->
                <tr>
                    <td
                    align="left" class="text-color-placeholder" style="font-size:0px;padding:0px;padding-bottom:4px;word-break:break-word;"
                    >
                    
        <div
            style="font-family:Inter, -apple-system, blinkmacsystemfont, 'Segoe UI',
        roboto, oxygen, ubuntu, cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.022em;line-height:1.18;text-align:left;color:#000000;"
        >Welcome to the SlashID Store!</div>
        
                    </td>
                </tr>
                
                <tr>
                    <td
                    align="left" class="text-color-foreground" style="font-size:0px;padding:0px;padding-bottom:12px;word-break:break-word;"
                    >
                    
        <div
            style="font-family:Inter, -apple-system, blinkmacsystemfont, 'Segoe UI',
        roboto, oxygen, ubuntu, cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.022em;line-height:1.18;text-align:left;color:#000000;"
        >Please resume browsing using a bigger screen.</div>
        
                    </td>
                </tr>
                
                <tr>
                    <td
                    align="left" class="text-color-contrast" style="font-size:0px;padding:0px;padding-bottom:24px;word-break:break-word;"
                    >
                    
        <div
            style="font-family:Inter, -apple-system, blinkmacsystemfont, 'Segoe UI',
        roboto, oxygen, ubuntu, cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;font-size:16px;font-weight:600;letter-spacing:-0.006em;line-height:1.3;text-align:left;color:#000000;"
        >The SlashID e-commerce playground was designed to display a side
                panel that shows you the inner workings of our SDK. Unfortunately,
                it doesn't fit on a mobile screen so please reopen the demo on a
                laptop or tablet. Thank you!</div>
        
                    </td>
                </tr>
                
                <tr>
                    <td
                    align="left" vertical-align="middle" class="button-bgcolor button-text-color" style="font-size:0px;padding:0px;padding-bottom:50px;word-break:break-word;"
                    >
                    
        <table
            border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"
        >
            <tbody>
            <tr>
                <td
                align="center" bgcolor="#414141" role="presentation" style="border:none;border-radius:16px;cursor:auto;mso-padding-alt:20px 24px 20px 24px;background:#414141;" valign="middle"
                >
                <a
                    href="{{ shopping_url }}" style="display:inline-block;background:#414141;color:#ffffff;font-family:Inter, -apple-system, blinkmacsystemfont, 'Segoe UI',
        roboto, oxygen, ubuntu, cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;font-size:16px;font-weight:600;line-height:1.22;letter-spacing:-0.006em;margin:0;text-decoration:none;text-transform:none;padding:20px 24px 20px 24px;mso-padding-alt:0px;border-radius:16px;" target="_blank"
                >
                    Go shopping
                </a>
                </td>
            </tr>
            </tbody>
        </table>
        
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td
                    align="left" class="footer text-color-secondary border-subtle" style="font-size:0px;padding:28px 0px;word-break:break-word;"
                    >
                    
        <div
            style="font-family:Inter, -apple-system, blinkmacsystemfont, 'Segoe UI',
        roboto, oxygen, ubuntu, cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
        >/id © 2022 SlashID® Inc. All Rights Reserved.
    <a href="https://www.slashid.dev/terms-of-use/" target="_blank" rel="noopener noreferrer">Terms</a>
    ·
    <a href="https://www.slashid.dev/privacy-notice/" target="_blank" rel="noopener noreferrer">Privacy</a></div>
        
                    </td>
                </tr>
                
            </tbody>
        </table>
        
                </td>
            </tr>
            </tbody>
        </table>
        
        </div>
        
            <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
                </tr>
            </tbody>
            </table>
            
        </div>
        
        
        <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                </td>
                </tr>
            </tbody>
            </table>
            
        </div>
        
        
        <!--[if mso | IE]></td></tr></table><![endif]-->
        
        
        </div>
        
    </body>
    </html>
`;
