export default async function handler(req, res) {
  // =========================================================
  // ONLY POST REQUESTS
  // =========================================================

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {

    // =========================================================
    // GET CLIENT IP FROM VERCEL
    // =========================================================

    const forwardedFor =
      req.headers['x-forwarded-for'];

    const realIp =
      req.headers['x-real-ip'];

    let clientIp = '';

    if (forwardedFor) {

      // x-forwarded-for can contain:
      // client, proxy1, proxy2

      clientIp =
        forwardedFor
          .split(',')[0]
          .trim();

    } else if (realIp) {

      clientIp = realIp;

    } else if (req.socket?.remoteAddress) {

      clientIp =
        req.socket.remoteAddress;
    }

    // Remove IPv4 mapped IPv6 prefix
    clientIp =
      clientIp.replace(/^::ffff:/, '');


    // =========================================================
    // GET OTHER VISITOR INFORMATION
    // =========================================================

    const userAgent =
      req.headers['user-agent'] || '';

    const referer =
      req.headers['referer'] || '';

    const capturedAt =
      new Date().toISOString();


    // =========================================================
    // GOOGLE APPS SCRIPT URL
    // =========================================================

    const appsScriptUrl =
      process.env.APPS_SCRIPT_URL;


    if (!appsScriptUrl) {

      console.error(
        'APPS_SCRIPT_URL is not configured.'
      );

      return res.status(500).json({
        success: false,
        message:
          'Server configuration error.'
      });
    }


    // =========================================================
    // FORM DATA + SECURITY DATA
    // =========================================================

    const body = {

      ...(req.body || {}),

      // Server-generated information
      clientIp,

      userAgent,

      referer,

      capturedAt
    };


    // =========================================================
    // SEND TO GOOGLE APPS SCRIPT
    // =========================================================

    const response =
      await fetch(
        appsScriptUrl,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify(body)
        }
      );


    // =========================================================
    // READ APPS SCRIPT RESPONSE
    // =========================================================

    const result =
      await response.json();


    // =========================================================
    // RETURN RESPONSE TO REACT
    // =========================================================

    return res
      .status(
        response.ok
          ? 200
          : 500
      )
      .json(result);


  } catch (error) {

    console.error(
      'Enquiry API Error:',
      error
    );


    return res.status(500).json({

      success: false,

      message:
        'Unable to submit enquiry. Please try again.'

    });
  }
}