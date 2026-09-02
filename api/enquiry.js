export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.'
    });
  }

  try {
    // ========================================================
    // GET CLIENT IP
    // ========================================================

    const forwardedFor =
      req.headers['x-forwarded-for'];

    const realIp =
      req.headers['x-real-ip'];

    let clientIp = '';

    if (forwardedFor) {
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

    // Remove IPv4-mapped IPv6 prefix
    clientIp =
      clientIp.replace(
        /^::ffff:/,
        ''
      );


    // ========================================================
    // GET USER AGENT
    // ========================================================

    const userAgent =
      req.headers['user-agent'] || '';


    // ========================================================
    // GET REFERRER
    // ========================================================

    const referer =
      req.headers['referer'] || '';


    // ========================================================
    // CAPTURE TIME
    // ========================================================

    const capturedAt =
      new Date().toISOString();


    // ========================================================
    // GOOGLE APPS SCRIPT URL
    // ========================================================

    const appsScriptUrl =
      process.env.APPS_SCRIPT_URL;


    if (!appsScriptUrl) {

      console.error(
        'APPS_SCRIPT_URL environment variable is missing.'
      );

      return res.status(500).json({
        success: false,
        message:
          'Server configuration error.'
      });

    }


    // ========================================================
    // GET REQUEST BODY
    // ========================================================

    let requestBody =
      req.body || {};


    // Handle string body if required
    if (
      typeof requestBody === 'string'
    ) {

      try {

        requestBody =
          JSON.parse(
            requestBody
          );

      } catch (error) {

        return res.status(400).json({
          success: false,
          message:
            'Invalid JSON request.'
        });

      }

    }


    // ========================================================
    // ADD SERVER-SIDE INFORMATION
    // ========================================================

    const body = {

      ...requestBody,

      // Server captured values
      clientIp,

      userAgent,

      referer,

      capturedAt

    };


    // ========================================================
    // SEND TO GOOGLE APPS SCRIPT
    // ========================================================

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


    // ========================================================
    // READ APPS SCRIPT RESPONSE SAFELY
    // ========================================================

    const responseText =
      await response.text();


    console.log(
      'Google Apps Script status:',
      response.status
    );


    console.log(
      'Google Apps Script response:',
      responseText
    );


    let result;


    try {

      result =
        responseText
          ? JSON.parse(
              responseText
            )
          : {
              success:
                response.ok
            };

    } catch (jsonError) {

      console.error(
        'Invalid Google Apps Script JSON response:',
        responseText
      );

      return res.status(502).json({

        success: false,

        message:
          'Google Apps Script returned an invalid response.',

        upstreamStatus:
          response.status

      });

    }


    // ========================================================
    // RETURN RESULT TO REACT
    // ========================================================

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