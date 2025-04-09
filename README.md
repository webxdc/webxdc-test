# Test Webxdc Tool

A little webxdc tool to test webxdc-interpreter implementations.


## Building

to create a `.xdc` file, execute:

```sh
./create-xdc.sh
```

## Testing network isolation

<!-- FYI this section is linked to from
https://github.com/deltachat/deltachat-desktop/blob/main/RELEASE.md. -->

To test whether a webxdc runtime implementation (i.e. a messenger) keeps
the ["apps can't access internet" promise](https://delta.chat/en/2023-05-22-webxdc-security#the-unique-privacy-promise-of-web-apps-without-tracking-or-platforms),
one can utilize this app together with [Wireshark](https://www.wireshark.org/).

1. Launch Wireshark.
2. Start capturing packets on the default "internet" interface.
3. Apply the following packet filter:

   ```js
   ip.addr == 173.194.76.127 ||
   ip.addr == 37.218.242.41 ||
   udp contains "delta" ||
   tcp contains "delta"
   ```

   The first IP is the IP address of a Google STUN server,
   used in this app's WebRTC test.
   The second IP is the IP address of delta.chat.

4. Open the webxdc runtime (i.e. the Delta Chat client)
   and launch this webxdc app.
5. Scroll down to the ["DNS Prefetch" section](https://github.com/webxdc/webxdc-test/blob/db2796226d420535cb1caf9ba29e7d639e9e01f2/index.html#L67).
6. Type in `foobar.delta.chat` and press all the 3 buttons in the section.
7. Go back to Wireshark and verify that
   there are 0 packets that match the filter.

Disclaimer: the fact that a webxdc implementation passed all these tests
doesn't mean that it's fool-proof.

Wireshark is required because this webxdc app
might not always be able to receive data back, and thus detect a leak.
For example, this is the case for the
[TURN server test](./js/webrtc.js#L27-L36).

As a bonus step, try building Delta Chat with no CSP set for webxdc apps,
and repeating the test.
Still no network activity should occur,
otherwise we're one misstep away from breaking the promise.
